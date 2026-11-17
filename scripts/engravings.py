"""Specimen plates: fine line, hatch, stipple, and a pale watercolour tint.

Original drawings for the calendar. No pasted pictures.
"""

from __future__ import annotations

import math
import random

from reportlab.lib.colors import CMYKColor

MM = 72 / 25.4


def cmyk(hex_color: str) -> CMYKColor:
    value = hex_color.lstrip("#")
    red, green, blue = (int(value[i : i + 2], 16) / 255 for i in (0, 2, 4))
    black = 1 - max(red, green, blue)
    if black >= 0.999:
        return CMYKColor(0, 0, 0, 1)
    scale = 1 - black
    return CMYKColor((1 - red - black) / scale, (1 - green - black) / scale, (1 - blue - black) / scale, black)


INK = cmyk("241c16")
SEPIA = cmyk("5c4632")
BROWN = cmyk("6b4a32")
GREEN = cmyk("243f32")
SAGE = cmyk("d7e2d4")
SAGE_DEEP = cmyk("8aa58a")
ORANGE = cmyk("f3d2b0")
ORANGE_DEEP = cmyk("d4844a")
RED = cmyk("f0cfc6")
ROBIN = cmyk("e39a82")
RED_DEEP = cmyk("a84840")
CREAM = cmyk("f4efe4")
IVORY = cmyk("f7f1df")
GOLD = cmyk("e7d7a4")
GOLD_DEEP = cmyk("c4a15a")
BLUE = cmyk("d5e0e4")
BLUE_DEEP = cmyk("3e5966")
YELLOW = cmyk("f4e6b8")

ROMAN = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    11: "XI",
    12: "XII",
}

PLATES = {
    0: {
        "plant": "radish",
        "bird": "robin",
        "detail": "pod",
        "common": "Radish and robin",
        "plant_latin": "Raphanus sativus",
        "bird_latin": "Erithacus rubecula",
        "face": 1,
    },
    1: {
        "plant": "leek",
        "bird": "robin",
        "detail": "leek",
        "common": "Leek and robin",
        "plant_latin": "Allium porrum",
        "bird_latin": "Erithacus rubecula",
        "face": 1,
    },
    2: {
        "plant": "bean",
        "bird": "bluetit",
        "detail": "bean",
        "common": "Broad bean and blue tit",
        "plant_latin": "Vicia faba",
        "bird_latin": "Cyanistes caeruleus",
        "face": 1,
    },
    3: {
        "plant": "carrot",
        "bird": "robin",
        "detail": "umbel",
        "common": "Carrot and robin",
        "plant_latin": "Daucus carota",
        "bird_latin": "Erithacus rubecula",
        "face": -1,
    },
    4: {
        "plant": "lettuce",
        "bird": "blackbird",
        "detail": "seed",
        "common": "Lettuce and blackbird",
        "plant_latin": "Lactuca sativa",
        "bird_latin": "Turdus merula",
        "face": 1,
    },
    5: {
        "plant": "pea",
        "bird": "sparrow",
        "detail": "pea",
        "common": "Pea and house sparrow",
        "plant_latin": "Pisum sativum",
        "bird_latin": "Passer domesticus",
        "face": -1,
    },
    6: {
        "plant": "tomato",
        "bird": "wren",
        "detail": "flower",
        "common": "Tomato and wren",
        "plant_latin": "Solanum lycopersicum",
        "bird_latin": "Troglodytes troglodytes",
        "face": 1,
    },
    7: {
        "plant": "courgette",
        "bird": "blackbird",
        "detail": "bloom",
        "common": "Courgette and blackbird",
        "plant_latin": "Cucurbita pepo",
        "bird_latin": "Turdus merula",
        "face": -1,
    },
    8: {
        "plant": "corn",
        "bird": "goldfinch",
        "detail": "kernel",
        "common": "Sweetcorn and goldfinch",
        "plant_latin": "Zea mays",
        "bird_latin": "Carduelis carduelis",
        "face": 1,
    },
    9: {
        "plant": "onion",
        "bird": "robin",
        "detail": "ring",
        "common": "Onion and robin",
        "plant_latin": "Allium cepa",
        "bird_latin": "Erithacus rubecula",
        "face": -1,
    },
    10: {
        "plant": "garlic",
        "bird": "wren",
        "detail": "clove",
        "common": "Garlic and wren",
        "plant_latin": "Allium sativum",
        "bird_latin": "Troglodytes troglodytes",
        "face": 1,
    },
    11: {
        "plant": "parsnip",
        "bird": "blackbird",
        "detail": "disc",
        "common": "Parsnip and blackbird",
        "plant_latin": "Pastinaca sativa",
        "bird_latin": "Turdus merula",
        "face": 1,
    },
    12: {
        "plant": "kale",
        "bird": "robin",
        "detail": "curl",
        "common": "Kale and robin",
        "plant_latin": "Brassica oleracea",
        "bird_latin": "Erithacus rubecula",
        "face": 1,
    },
}


def _hatch(c, x, y, w, h, angle, gap, color, weight) -> None:
    c.saveState()
    c.setStrokeColor(color)
    c.setLineWidth(weight)
    cx, cy = x + w / 2, y + h / 2
    c.translate(cx, cy)
    c.rotate(angle)
    span = (abs(w) + abs(h)) * 0.9
    steps = int(span / gap) + 2
    for i in range(-steps, steps + 1):
        yy = i * gap
        c.line(-span, yy, span, yy)
    c.restoreState()


def _stipple(c, x, y, w, h, count, color, radius, seed) -> None:
    rng = random.Random(seed)
    c.setFillColor(color)
    for _ in range(count):
        c.circle(x + rng.random() * w, y + rng.random() * h, radius, fill=1, stroke=0)


def _in_clip(c, path, fn) -> None:
    c.saveState()
    c.clipPath(path, stroke=0, fill=0)
    fn()
    c.restoreState()


def _fill(c, path, color) -> None:
    c.setFillColor(color)
    c.drawPath(path, fill=1, stroke=0)


def _stroke(c, path, color, weight) -> None:
    c.setStrokeColor(color)
    c.setFillColor(color)
    c.setLineWidth(weight)
    c.setLineCap(1)
    c.setLineJoin(1)
    c.drawPath(path, fill=0, stroke=1)


def _line(c, x1, y1, x2, y2, color, weight) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(weight)
    c.setLineCap(1)
    c.line(x1, y1, x2, y2)


def _paper(c, x, y, w, h, seed) -> None:
    rng = random.Random(seed)
    c.setFillColor(SEPIA)
    for _ in range(int(w * h / 900)):
        c.circle(x + rng.random() * w, y + rng.random() * h, rng.choice((0.15, 0.22, 0.3)), fill=1, stroke=0)
    for i in range(5):
        fx = x + rng.random() * w
        fy = y + rng.random() * h
        for _ in range(10):
            c.circle(fx + rng.uniform(-3.5, 3.5), fy + rng.uniform(-2.5, 2.5), 0.28, fill=1, stroke=0)


def _leaflet(c, x, y, length, angle, width_ratio, fill) -> None:
    rad = math.radians(angle)
    px, py = math.cos(rad), math.sin(rad)
    nx, ny = -py, px
    width = length * width_ratio
    tip_x, tip_y = x + px * length, y + py * length
    path = c.beginPath()
    path.moveTo(x, y)
    path.curveTo(
        x + px * length * 0.35 + nx * width,
        y + py * length * 0.35 + ny * width,
        x + px * length * 0.72 + nx * width * 0.45,
        y + py * length * 0.72 + ny * width * 0.45,
        tip_x,
        tip_y,
    )
    path.curveTo(
        x + px * length * 0.72 - nx * width * 0.45,
        y + py * length * 0.72 - ny * width * 0.45,
        x + px * length * 0.35 - nx * width,
        y + py * length * 0.35 - ny * width,
        x,
        y,
    )
    path.close()
    _fill(c, path, fill)
    _stroke(c, path, GREEN, 0.35)
    _line(c, x, y, tip_x, tip_y, GREEN, 0.22)


def _pinnate(c, x, y, length, angle, pairs, width_ratio) -> None:
    rad = math.radians(angle)
    x1 = x + math.cos(rad) * length
    y1 = y + math.sin(rad) * length
    _line(c, x, y, x1, y1, GREEN, 0.45)
    for i in range(1, pairs + 1):
        t = i / (pairs + 0.4)
        px = x + (x1 - x) * t
        py = y + (y1 - y) * t
        leaf = length * (0.34 - 0.16 * t)
        _leaflet(c, px, py, leaf, angle + 62, width_ratio, SAGE)
        _leaflet(c, px, py, leaf * 0.92, angle - 62, width_ratio, SAGE)


def _tapered_root(c, cx, base, height, width, fill, tint, rings) -> None:
    top = base + height

    def path():
        p = c.beginPath()
        p.moveTo(cx, base + height * 0.02)
        p.curveTo(
            cx - width * 0.05,
            base + height * 0.22,
            cx - width * 0.62,
            base + height * 0.78,
            cx - width * 0.46,
            top,
        )
        p.curveTo(cx - width * 0.16, top + height * 0.035, cx + width * 0.16, top + height * 0.03, cx + width * 0.42, top - height * 0.01)
        p.curveTo(
            cx + width * 0.5,
            base + height * 0.74,
            cx + width * 0.08,
            base + height * 0.2,
            cx,
            base + height * 0.02,
        )
        p.close()
        return p

    _fill(c, path(), fill)

    def tinted():
        _stipple(c, cx - width, base, width * 1.3, height, 90, tint, 0.45, 3)
        _hatch(c, cx - width, base, width * 0.85, height, -78, 2.4, SEPIA, 0.16)
        if rings:
            c.setStrokeColor(SEPIA)
            c.setLineWidth(0.25)
            for i in range(1, 9):
                yy = base + height * (0.12 + i * 0.09)
                c.line(cx - width, yy, cx + width, yy)

    _in_clip(c, path(), tinted)
    _stroke(c, path(), SEPIA, 0.7)
    # crown scar
    c.setStrokeColor(SEPIA)
    c.setLineWidth(0.4)
    c.ellipse(cx - width * 0.18, top - height * 0.02, cx + width * 0.18, top + height * 0.045, fill=0, stroke=1)


def draw_carrot(c, cx, base, height) -> None:
    root_h = height * 0.62
    width = root_h / 5.6
    _tapered_root(c, cx, base, root_h, width, ORANGE, ORANGE_DEEP, True)
    crown = base + root_h
    for angle, length in ((62, height * 0.36), (84, height * 0.44), (104, height * 0.4), (122, height * 0.32), (74, height * 0.26)):
        _fern(c, cx, crown, length, angle)


def draw_parsnip(c, cx, base, height) -> None:
    root_h = height * 0.64
    width = root_h / 3.7
    _tapered_root(c, cx, base, root_h, width, IVORY, cmyk("c4b48a"), True)
    crown = base + root_h
    for angle, length in ((70, height * 0.32), (96, height * 0.38), (122, height * 0.3)):
        _pinnate(c, cx, crown, length, angle, 5, 0.42)


def draw_radish(c, cx, base, height) -> None:
    globe = height * 0.18
    gy = base + height * 0.16
    gx = cx

    def bulb():
        p = c.beginPath()
        p.moveTo(gx, gy - globe * 0.15)
        p.curveTo(gx - globe * 0.15, gy - globe * 0.05, gx - globe * 0.55, gy + globe * 0.15, gx - globe * 0.42, gy + globe * 0.55)
        p.curveTo(gx - globe * 0.2, gy + globe * 0.95, gx + globe * 0.25, gy + globe * 0.95, gx + globe * 0.46, gy + globe * 0.55)
        p.curveTo(gx + globe * 0.58, gy + globe * 0.15, gx + globe * 0.12, gy - globe * 0.05, gx, gy - globe * 0.15)
        p.close()
        return p

    _fill(c, bulb(), RED)

    def shade():
        _stipple(c, gx - globe, gy - globe * 0.2, globe * 1.2, globe * 1.3, 70, RED_DEEP, 0.4, 11)
        _hatch(c, gx - globe, gy, globe * 0.7, globe, -60, 2.2, SEPIA, 0.15)

    _in_clip(c, bulb(), shade)
    _stroke(c, bulb(), SEPIA, 0.65)
    # pale tip and a thin taproot, so this is not a carrot
    _line(c, gx, gy - globe * 0.1, gx - width_nudge(globe), base, SEPIA, 0.45)
    _line(c, gx + globe * 0.08, gy + globe * 0.05, gx + globe * 0.02, base + height * 0.05, SEPIA, 0.3)
    crown = gy + globe * 0.9
    for angle, length in ((58, height * 0.34), (86, height * 0.42), (114, height * 0.36), (136, height * 0.26)):
        _lyrate(c, gx, crown, length, angle)


def width_nudge(globe: float) -> float:
    return globe * 0.04


def _fern(c, x, y, length, angle) -> None:
    """Finely divided leaf, the shape of carrot foliage rather than a broad leaflet."""
    rad = math.radians(angle)
    x1 = x + math.cos(rad) * length
    y1 = y + math.sin(rad) * length
    _line(c, x, y, x1, y1, GREEN, 0.4)
    steps = 9
    for i in range(1, steps + 1):
        t = i / (steps + 0.3)
        px = x + (x1 - x) * t
        py = y + (y1 - y) * t
        branch = length * 0.2 * (1.15 - t)
        for side in (1, -1):
            branch_angle = math.radians(angle + side * 52)
            ex = px + math.cos(branch_angle) * branch
            ey = py + math.sin(branch_angle) * branch
            _line(c, px, py, ex, ey, GREEN, 0.28)
            if branch > 7:
                for frac in (0.4, 0.72):
                    sx = px + math.cos(branch_angle) * branch * frac
                    sy = py + math.sin(branch_angle) * branch * frac
                    sub = branch * 0.35
                    for turn in (0.9, -0.9):
                        _line(
                            c,
                            sx,
                            sy,
                            sx + math.cos(branch_angle + turn) * sub,
                            sy + math.sin(branch_angle + turn) * sub,
                            GREEN,
                            0.18,
                        )


def _lyrate(c, x, y, length, angle) -> None:
    """Radish-type leaf: a petiole, small side lobes, and one large end lobe."""
    rad = math.radians(angle)
    px, py = math.cos(rad), math.sin(rad)
    _line(c, x, y, x + px * length * 0.72, y + py * length * 0.72, GREEN, 0.4)
    for t, scale in ((0.28, 0.16), (0.46, 0.2)):
        lx = x + px * length * t
        ly = y + py * length * t
        _leaflet(c, lx, ly, length * scale, angle + 70, 0.55, SAGE)
        _leaflet(c, lx, ly, length * scale * 0.85, angle - 70, 0.5, SAGE)
    _leaflet(c, x + px * length * 0.62, y + py * length * 0.62, length * 0.42, angle, 0.48, SAGE)


def _simple_leaf(c, x, y, length, angle, width_ratio) -> None:
    """A broad leaf with a midrib and a few side veins. Not feathery."""
    rad = math.radians(angle)
    px, py = math.cos(rad), math.sin(rad)
    nx, ny = -py, px
    width = length * width_ratio
    tip_x, tip_y = x + px * length, y + py * length
    path = c.beginPath()
    path.moveTo(x, y)
    path.curveTo(
        x + px * length * 0.25 + nx * width,
        y + py * length * 0.2 + ny * width,
        x + px * length * 0.7 + nx * width * 0.7,
        y + py * length * 0.62 + ny * width * 0.7,
        tip_x,
        tip_y,
    )
    path.curveTo(
        x + px * length * 0.7 - nx * width * 0.55,
        y + py * length * 0.68 - ny * width * 0.55,
        x + px * length * 0.28 - nx * width * 0.85,
        y + py * length * 0.3 - ny * width * 0.85,
        x,
        y,
    )
    path.close()
    _fill(c, path, SAGE)
    _stroke(c, path, GREEN, 0.4)
    _line(c, x, y, tip_x, tip_y, GREEN, 0.28)
    for t, side in ((0.35, 1), (0.35, -1), (0.55, 1), (0.55, -1)):
        vx = x + px * length * t
        vy = y + py * length * t
        _line(c, vx, vy, vx + nx * side * width * 0.45, vy + ny * side * width * 0.45, GREEN, 0.18)


def draw_leek(c, cx, base, height) -> None:
    shaft_h = height * 0.46
    shaft_w = height * 0.055
    top = base + shaft_h
    path = c.beginPath()
    path.moveTo(cx - shaft_w, base + height * 0.04)
    path.curveTo(cx - shaft_w * 1.05, base + shaft_h * 0.4, cx - shaft_w * 0.7, top - 4, cx - shaft_w * 0.2, top)
    path.lineTo(cx + shaft_w * 0.35, top)
    path.curveTo(cx + shaft_w * 0.9, top - 6, cx + shaft_w * 1.1, base + shaft_h * 0.35, cx + shaft_w, base + height * 0.04)
    path.close()
    _fill(c, path, IVORY)

    def veins():
        c.setStrokeColor(SAGE_DEEP)
        c.setLineWidth(0.25)
        for i in range(-2, 3):
            c.line(cx + i * shaft_w * 0.28, base + height * 0.08, cx + i * shaft_w * 0.18, top - 2)

    _in_clip(c, path, veins)
    _stroke(c, path, SEPIA, 0.6)
    for i, angle in enumerate((-8, 6, 18, -20, 28)):
        _strap(c, cx, top - 2, height * (0.42 - i * 0.03), 90 + angle, height * 0.035)
    for i in range(-4, 5):
        _line(c, cx + i * 1.4, base + height * 0.04, cx + i * 2.2, base, SEPIA, 0.25)


def _strap(c, x, y, length, angle, width) -> None:
    rad = math.radians(angle)
    px, py = math.cos(rad), math.sin(rad)
    nx, ny = -py, px
    tip_x, tip_y = x + px * length, y + py * length
    path = c.beginPath()
    path.moveTo(x + nx * width, y + ny * width)
    path.curveTo(
        x + px * length * 0.45 + nx * width,
        y + py * length * 0.45 + ny * width,
        tip_x + nx * width * 0.3,
        tip_y + ny * width * 0.3,
        tip_x,
        tip_y,
    )
    path.curveTo(
        tip_x - nx * width * 0.3,
        tip_y - ny * width * 0.3,
        x + px * length * 0.45 - nx * width,
        y + py * length * 0.45 - ny * width,
        x - nx * width,
        y - ny * width,
    )
    path.close()
    _fill(c, path, SAGE)
    _stroke(c, path, GREEN, 0.35)
    _line(c, x, y, tip_x, tip_y, GREEN, 0.22)


def draw_onion(c, cx, base, height) -> None:
    bulb_r = height * 0.16
    cy = base + bulb_r * 1.05

    def bulb():
        p = c.beginPath()
        p.moveTo(cx, cy - bulb_r * 0.85)
        p.curveTo(cx - bulb_r * 1.15, cy - bulb_r * 0.2, cx - bulb_r * 1.05, cy + bulb_r * 0.7, cx, cy + bulb_r * 0.95)
        p.curveTo(cx + bulb_r * 1.05, cy + bulb_r * 0.7, cx + bulb_r * 1.15, cy - bulb_r * 0.2, cx, cy - bulb_r * 0.85)
        p.close()
        return p

    _fill(c, bulb(), GOLD)

    def rings():
        c.setStrokeColor(SEPIA)
        c.setLineWidth(0.3)
        for scale in (0.72, 0.48):
            c.ellipse(cx - bulb_r * scale, cy - bulb_r * scale * 0.85, cx + bulb_r * scale, cy + bulb_r * scale * 0.9, fill=0, stroke=1)
        _hatch(c, cx - bulb_r, cy - bulb_r, bulb_r * 0.8, bulb_r * 2, 80, 2.6, SEPIA, 0.14)

    _in_clip(c, bulb(), rings)
    _stroke(c, bulb(), SEPIA, 0.65)
    neck = cy + bulb_r * 0.9
    _line(c, cx - 1.5, neck, cx - 1, neck + height * 0.08, SEPIA, 0.4)
    for angle, length in ((78, height * 0.42), (96, height * 0.48), (112, height * 0.36)):
        _strap(c, cx, neck, length, angle, height * 0.018)


def draw_garlic(c, cx, base, height) -> None:
    bulb_w = height * 0.2
    bulb_h = height * 0.22
    cy = base + bulb_h * 0.55

    def bulb():
        p = c.beginPath()
        p.moveTo(cx, cy - bulb_h * 0.45)
        p.curveTo(cx - bulb_w, cy - bulb_h * 0.1, cx - bulb_w * 0.95, cy + bulb_h * 0.55, cx, cy + bulb_h * 0.62)
        p.curveTo(cx + bulb_w * 0.95, cy + bulb_h * 0.55, cx + bulb_w, cy - bulb_h * 0.1, cx, cy - bulb_h * 0.45)
        p.close()
        return p

    _fill(c, bulb(), IVORY)

    def cloves():
        c.setStrokeColor(SEPIA)
        c.setLineWidth(0.35)
        c.line(cx, cy - bulb_h * 0.2, cx, cy + bulb_h * 0.55)
        c.line(cx - bulb_w * 0.45, cy, cx, cy + bulb_h * 0.5)
        c.line(cx + bulb_w * 0.45, cy, cx, cy + bulb_h * 0.5)
        _hatch(c, cx - bulb_w, cy - bulb_h, bulb_w * 2, bulb_h * 1.4, 75, 2.8, SEPIA, 0.14)

    _in_clip(c, bulb(), cloves)
    _stroke(c, bulb(), SEPIA, 0.6)
    top = cy + bulb_h * 0.55
    for angle, length in ((70, height * 0.4), (100, height * 0.46), (128, height * 0.32)):
        _strap(c, cx, top, length, angle, height * 0.02)


def _oval_leaf(c, x, y, length, angle, width) -> None:
    _leaflet(c, x, y, length, angle, width, SAGE)


def draw_bean(c, cx, base, height) -> None:
    top = base + height * 0.9
    _line(c, cx, base + height * 0.08, cx, top, GREEN, 0.9)
    _line(c, cx + 1.4, base + height * 0.08, cx + 1.4, top, GREEN, 0.35)
    y = base + height * 0.28
    side = -1
    while y < top - height * 0.08:
        _oval_leaf(c, cx, y, height * 0.16, 180 if side < 0 else 8, 0.42)
        _oval_leaf(c, cx, y + height * 0.04, height * 0.13, (180 if side < 0 else 0) + side * 28, 0.38)
        y += height * 0.2
        side *= -1
    # pod
    pod = c.beginPath()
    pod.moveTo(cx + 2, base + height * 0.42)
    pod.curveTo(cx + height * 0.16, base + height * 0.36, cx + height * 0.18, base + height * 0.62, cx + 4, base + height * 0.66)
    pod.curveTo(cx + height * 0.12, base + height * 0.6, cx + height * 0.1, base + height * 0.4, cx + 2, base + height * 0.42)
    _fill(c, pod, SAGE)
    _stroke(c, pod, GREEN, 0.45)


def draw_pea(c, cx, base, height) -> None:
    top = base + height * 0.92
    _line(c, cx, base + height * 0.05, cx + height * 0.04, top, GREEN, 0.6)
    y = base + height * 0.22
    while y < top - height * 0.12:
        _oval_leaf(c, cx, y, height * 0.14, 168, 0.48)
        _oval_leaf(c, cx, y, height * 0.14, 12, 0.48)
        _tendril(c, cx + 2, y + height * 0.08)
        y += height * 0.24
    pod = c.beginPath()
    pod.moveTo(cx - 2, base + height * 0.38)
    pod.curveTo(cx - height * 0.16, base + height * 0.34, cx - height * 0.14, base + height * 0.58, cx, base + height * 0.6)
    pod.curveTo(cx - height * 0.08, base + height * 0.52, cx - height * 0.08, base + height * 0.4, cx - 2, base + height * 0.38)
    _fill(c, pod, SAGE)
    _stroke(c, pod, GREEN, 0.45)
    c.setFillColor(GREEN)
    for i in range(4):
        c.circle(cx - height * 0.06 - i * 0.2, base + height * (0.44 + i * 0.035), 1.1, fill=1, stroke=0)


def _tendril(c, x, y) -> None:
    path = c.beginPath()
    path.moveTo(x, y)
    path.curveTo(x + 8, y + 10, x - 2, y + 16, x + 6, y + 22)
    path.curveTo(x + 12, y + 26, x + 4, y + 30, x + 8, y + 34)
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.4)
    c.drawPath(path, stroke=1, fill=0)


def draw_lettuce(c, cx, base, height) -> None:
    cy = base + height * 0.28
    for i, (angle, length) in enumerate(((200, 0.34), (250, 0.38), (160, 0.32), (300, 0.36), (110, 0.3), (70, 0.28), (90, 0.42))):
        _simple_leaf(c, cx, cy, height * length, angle if angle <= 180 else angle - 360, 0.38)


def draw_tomato(c, cx, base, height) -> None:
    r = height * 0.16
    cy = base + height * 0.28
    c.setFillColor(RED)
    c.circle(cx, cy, r, fill=1, stroke=0)
    c.saveState()
    clip = c.beginPath()
    clip.circle(cx, cy, r)
    c.clipPath(clip, stroke=0, fill=0)
    _stipple(c, cx - r, cy - r, r * 1.2, r * 2, 50, RED_DEEP, 0.4, 6)
    _hatch(c, cx - r, cy - r, r, r * 2, -70, 2.3, SEPIA, 0.15)
    c.restoreState()
    c.setStrokeColor(SEPIA)
    c.setLineWidth(0.6)
    c.circle(cx, cy, r, fill=0, stroke=1)
    # calyx
    for i in range(5):
        angle = 90 + i * 72
        _leaflet(c, cx, cy + r * 0.85, r * 0.7, angle, 0.28, SAGE)
    _pinnate(c, cx + r * 0.2, cy + r * 1.3, height * 0.42, 75, 4, 0.38)
    _pinnate(c, cx - r * 0.1, cy + r * 1.15, height * 0.3, 110, 3, 0.36)


def draw_courgette(c, cx, base, height) -> None:
    _palmate(c, cx + height * 0.02, base + height * 0.62, height * 0.4)
    fruit = c.beginPath()
    left = cx - height * 0.11
    fruit.moveTo(left, base + height * 0.08)
    fruit.curveTo(left - height * 0.02, base + height * 0.2, left, base + height * 0.42, left + height * 0.02, base + height * 0.5)
    fruit.lineTo(left + height * 0.1, base + height * 0.5)
    fruit.curveTo(left + height * 0.12, base + height * 0.4, left + height * 0.1, base + height * 0.18, left + height * 0.08, base + height * 0.08)
    fruit.close()
    _fill(c, fruit, SAGE)

    def stripes():
        c.setStrokeColor(GREEN)
        c.setLineWidth(0.4)
        for i in range(4):
            c.line(left + 3 + i * 4, base + height * 0.12, left + 4 + i * 4, base + height * 0.46)

    _in_clip(c, fruit, stripes)
    _stroke(c, fruit, GREEN, 0.5)


def _palmate(c, x, y, size) -> None:
    for angle in (55, 80, 105, 130, 150):
        _simple_leaf(c, x, y, size * (0.7 if angle in (55, 150) else 1), angle, 0.28)
    c.setFillColor(SAGE)
    c.circle(x, y, size * 0.08, fill=1, stroke=0)


def draw_corn(c, cx, base, height) -> None:
    _line(c, cx, base, cx, base + height * 0.92, GREEN, 0.8)
    _strap(c, cx, base + height * 0.55, height * 0.4, 118, height * 0.03)
    _strap(c, cx, base + height * 0.7, height * 0.28, 62, height * 0.025)
    cob_x = cx + height * 0.02
    cob_y = base + height * 0.34
    cob_w = height * 0.07
    cob_h = height * 0.28
    # husk
    husk = c.beginPath()
    husk.moveTo(cob_x, cob_y)
    husk.curveTo(cob_x - cob_w * 1.8, cob_y + cob_h * 0.2, cob_x - cob_w, cob_y + cob_h, cob_x + cob_w * 0.2, cob_y + cob_h * 1.05)
    husk.curveTo(cob_x + cob_w * 0.6, cob_y + cob_h * 0.7, cob_x + cob_w * 0.4, cob_y + cob_h * 0.2, cob_x, cob_y)
    _fill(c, husk, SAGE)
    _stroke(c, husk, GREEN, 0.4)
    cob = c.beginPath()
    cob.moveTo(cob_x + cob_w * 0.15, cob_y + cob_h * 0.08)
    cob.curveTo(cob_x + cob_w * 1.3, cob_y + cob_h * 0.15, cob_x + cob_w * 1.35, cob_y + cob_h * 0.85, cob_x + cob_w * 0.3, cob_y + cob_h)
    cob.curveTo(cob_x - cob_w * 0.15, cob_y + cob_h * 0.8, cob_x - cob_w * 0.1, cob_y + cob_h * 0.2, cob_x + cob_w * 0.15, cob_y + cob_h * 0.08)
    _fill(c, cob, GOLD)

    def kernels():
        c.setStrokeColor(GOLD_DEEP)
        c.setLineWidth(0.25)
        for row in range(6):
            for col in range(3):
                kx = cob_x + cob_w * (0.15 + col * 0.32)
                ky = cob_y + cob_h * (0.18 + row * 0.12)
                c.ellipse(kx, ky, kx + cob_w * 0.26, ky + cob_h * 0.09, fill=0, stroke=1)

    _in_clip(c, cob, kernels)
    _stroke(c, cob, SEPIA, 0.45)


def draw_kale(c, cx, base, height) -> None:
    _line(c, cx, base, cx, base + height * 0.22, GREEN, 1.1)
    leaf_y = base + height * 0.2
    # a large crinkled leaf standing up
    path = c.beginPath()
    path.moveTo(cx, leaf_y)
    path.curveTo(cx - height * 0.22, leaf_y + height * 0.15, cx - height * 0.28, leaf_y + height * 0.45, cx - height * 0.08, leaf_y + height * 0.7)
    path.curveTo(cx - height * 0.02, leaf_y + height * 0.78, cx + height * 0.08, leaf_y + height * 0.76, cx + height * 0.12, leaf_y + height * 0.66)
    path.curveTo(cx + height * 0.28, leaf_y + height * 0.5, cx + height * 0.24, leaf_y + height * 0.18, cx, leaf_y)
    path.close()
    _fill(c, path, SAGE)

    def crinkle():
        c.setStrokeColor(GREEN)
        c.setLineWidth(0.35)
        c.line(cx, leaf_y, cx + height * 0.02, leaf_y + height * 0.68)
        for i in range(1, 7):
            yy = leaf_y + height * 0.1 * i
            c.line(cx - height * 0.16, yy, cx + height * 0.14, yy + height * 0.03)
        _hatch(c, cx - height * 0.3, leaf_y, height * 0.55, height * 0.75, 18, 3.2, GREEN, 0.12)

    _in_clip(c, path, crinkle)
    _stroke(c, path, GREEN, 0.55)


def draw_detail(c, x, y, size, kind) -> None:
    c.setStrokeColor(SEPIA)
    c.setFillColor(SEPIA)
    c.setFont("Italic", 7)
    c.drawString(x, y + size + 2, "a")
    if kind == "umbel":
        _line(c, x + size * 0.5, y, x + size * 0.5, y + size * 0.45, GREEN, 0.35)
        c.setFillColor(SEPIA)
        for i in range(9):
            angle = math.radians(-70 + i * 18)
            dx = math.cos(angle) * size * 0.42
            dy = math.sin(angle) * size * 0.28
            c.circle(x + size * 0.5 + dx, y + size * 0.45 + dy, 0.7, fill=1, stroke=0)
    elif kind == "leek":
        c.setStrokeColor(SAGE_DEEP)
        c.setLineWidth(0.4)
        for i in range(4):
            c.ellipse(x + i * 3, y + i * 2, x + size - i * 3, y + size * 0.7 - i * 2, fill=0, stroke=1)
    elif kind == "bean":
        path = c.beginPath()
        path.moveTo(x + size * 0.2, y + size * 0.3)
        path.curveTo(x, y + size * 0.55, x + size * 0.3, y + size * 0.9, x + size * 0.7, y + size * 0.75)
        path.curveTo(x + size, y + size * 0.6, x + size * 0.7, y + size * 0.15, x + size * 0.2, y + size * 0.3)
        _fill(c, path, IVORY)
        _stroke(c, path, SEPIA, 0.45)
    elif kind == "pod":
        _line(c, x + size * 0.2, y, x + size * 0.35, y + size, GREEN, 0.4)
        path = c.beginPath()
        path.moveTo(x + size * 0.3, y + size * 0.25)
        path.curveTo(x + size * 0.85, y + size * 0.2, x + size * 0.8, y + size * 0.8, x + size * 0.35, y + size * 0.7)
        _stroke(c, path, GREEN, 0.4)
    elif kind == "seed":
        c.setStrokeColor(SEPIA)
        c.setLineWidth(0.4)
        c.ellipse(x, y + size * 0.15, x + size * 0.45, y + size * 0.7, fill=0, stroke=1)
    elif kind == "pea":
        c.setFillColor(SAGE)
        c.circle(x + size * 0.25, y + size * 0.35, size * 0.22, fill=1, stroke=1)
    elif kind == "flower":
        c.setStrokeColor(GOLD_DEEP)
        c.setFillColor(YELLOW)
        for i in range(5):
            angle = math.radians(90 + i * 72)
            c.circle(x + size * 0.35 + math.cos(angle) * size * 0.22, y + size * 0.4 + math.sin(angle) * size * 0.22, size * 0.12, fill=1, stroke=1)
        c.setFillColor(GOLD_DEEP)
        c.circle(x + size * 0.35, y + size * 0.4, size * 0.06, fill=1, stroke=0)
    elif kind == "bloom":
        _simple_leaf(c, x, y, size * 0.9, 80, 0.22)
    elif kind == "kernel":
        c.setFillColor(GOLD)
        c.setStrokeColor(SEPIA)
        c.setLineWidth(0.35)
        c.roundRect(x, y + size * 0.1, size * 0.28, size * 0.45, 2, fill=1, stroke=1)
    elif kind == "ring":
        c.setStrokeColor(GOLD_DEEP)
        c.setLineWidth(0.45)
        for i in range(3):
            c.circle(x + size * 0.35, y + size * 0.4, size * (0.12 + i * 0.1), fill=0, stroke=1)
    elif kind == "clove":
        path = c.beginPath()
        path.moveTo(x + size * 0.3, y)
        path.curveTo(x, y + size * 0.25, x + size * 0.05, y + size * 0.7, x + size * 0.3, y + size * 0.85)
        path.curveTo(x + size * 0.55, y + size * 0.7, x + size * 0.6, y + size * 0.25, x + size * 0.3, y)
        _fill(c, path, IVORY)
        _stroke(c, path, SEPIA, 0.45)
    elif kind == "disc":
        c.setStrokeColor(SEPIA)
        c.setFillColor(IVORY)
        c.setLineWidth(0.4)
        c.ellipse(x, y + size * 0.25, x + size * 0.7, y + size * 0.55, fill=1, stroke=1)
    elif kind == "curl":
        _simple_leaf(c, x, y, size, 75, 0.3)


def _ellipse(c, cx, cy, rx, ry):
    path = c.beginPath()
    path.ellipse(cx - rx, cy - ry, cx + rx, cy + ry)
    return path


def _circle(c, cx, cy, r):
    path = c.beginPath()
    path.circle(cx, cy, r)
    return path


def draw_bird(c, x, y, s, kind, face) -> None:
    """Side-on passerine. s is the height from the twig to the crown."""
    c.saveState()
    dark = kind == "blackbird"
    tail_len = s * (0.62 if kind == "blackbird" else 0.22 if kind == "wren" else 0.5)
    body_rx = s * (0.32 if kind == "blackbird" else 0.26)
    body_ry = s * 0.19
    body_cx = tail_len + body_rx * 0.55
    body_cy = s * 0.34
    head_r = s * (0.11 if kind == "wren" else 0.125)
    head_cx = body_cx + body_rx * 0.72
    head_cy = body_cy + body_ry * 0.72 + head_r * 0.55
    bill_len = head_r * (1.7 if kind == "blackbird" else 0.9 if kind == "sparrow" else 1.25)
    span = head_cx + head_r + bill_len + 6
    if face < 0:
        c.translate(x + span, y)
        c.scale(-1, 1)
    else:
        c.translate(x, y)

    def tail_path():
        path = c.beginPath()
        if kind == "wren":
            path.moveTo(body_cx - body_rx * 0.75, body_cy)
            path.lineTo(body_cx - body_rx * 0.2, body_cy + s * 0.4)
            path.lineTo(body_cx + body_rx * 0.05, body_cy + s * 0.28)
            path.close()
        else:
            path.moveTo(1, body_cy + body_ry * 0.2)
            path.lineTo(tail_len * 0.96, body_cy + body_ry * 0.7)
            path.lineTo(tail_len * 0.96, body_cy - body_ry * 0.25)
            path.lineTo(1, body_cy - body_ry * 0.15)
            path.close()
        return path

    body = _ellipse(c, body_cx, body_cy, body_rx, body_ry)
    head = _circle(c, head_cx, head_cy, head_r)
    _fill(c, tail_path(), cmyk("3a2e28") if dark else CREAM)
    _fill(c, body, cmyk("3a2e28") if dark else CREAM)
    _fill(c, head, cmyk("3a2e28") if dark else CREAM)

    def shade_tail():
        _hatch(c, body_cx - body_rx - tail_len, body_cy - s * 0.1, tail_len + body_rx, s * 0.5, 70, 1.6, INK if dark else BROWN, 0.16)

    _in_clip(c, tail_path(), shade_tail)

    def shade_body():
        _hatch(c, body_cx - body_rx, body_cy, body_rx * 2, body_ry + 2, 32, 1.7, INK if dark else BROWN, 0.17)
        if dark:
            _hatch(c, body_cx - body_rx, body_cy - body_ry, body_rx * 2, body_ry * 2, -50, 2.1, INK, 0.14)

    _in_clip(c, body, shade_body)

    def shade_crown():
        _hatch(c, head_cx - head_r, head_cy, head_r * 2, head_r + 2, 25, 1.5, INK if dark else BROWN, 0.16)

    _in_clip(c, head, shade_crown)

    if kind == "robin":
        _fill(c, head, ROBIN)

        def crown():
            c.setFillColor(cmyk("c9b39a"))
            c.rect(head_cx - head_r - 1, head_cy + head_r * 0.15, head_r * 2 + 2, head_r + 2, fill=1, stroke=0)
            _hatch(c, head_cx - head_r, head_cy + head_r * 0.1, head_r * 2, head_r, 30, 1.4, BROWN, 0.16)

        _in_clip(c, head, crown)

        def breast():
            path = c.beginPath()
            path.moveTo(body_cx + body_rx * 0.15, body_cy + body_ry * 0.72)
            path.curveTo(
                body_cx + body_rx * 1.05,
                body_cy + body_ry * 0.2,
                body_cx + body_rx * 0.9,
                body_cy - body_ry * 0.55,
                body_cx + body_rx * 0.05,
                body_cy - body_ry * 0.35,
            )
            path.curveTo(
                body_cx - body_rx * 0.15,
                body_cy - body_ry * 0.05,
                body_cx - body_rx * 0.05,
                body_cy + body_ry * 0.55,
                body_cx + body_rx * 0.15,
                body_cy + body_ry * 0.72,
            )
            path.close()
            _fill(c, path, ROBIN)
            _stipple(c, body_cx, body_cy - body_ry, body_rx, body_ry * 1.6, 28, RED_DEEP, 0.26, 9)

        _in_clip(c, body, breast)
    elif kind == "bluetit":
        _in_clip(c, head, lambda: (_fill(c, _circle(c, head_cx, head_cy + head_r * 0.15, head_r * 0.85), BLUE),))
        _line(c, head_cx - head_r * 0.2, head_cy, head_cx + head_r * 0.85, head_cy - head_r * 0.15, INK, 0.55)

        def belly():
            c.setFillColor(YELLOW)
            c.rect(body_cx - body_rx, body_cy - body_ry, body_rx * 2, body_ry * 0.85, fill=1, stroke=0)

        _in_clip(c, body, belly)
    elif kind == "goldfinch":
        _in_clip(c, head, lambda: _fill(c, _circle(c, head_cx - head_r * 0.1, head_cy + head_r * 0.35, head_r * 0.72), INK))
        _in_clip(c, head, lambda: _fill(c, _circle(c, head_cx + head_r * 0.35, head_cy - head_r * 0.05, head_r * 0.55), RED))
    elif kind == "sparrow":
        bib = c.beginPath()
        bib.moveTo(head_cx + head_r * 0.1, head_cy - head_r * 0.2)
        bib.lineTo(head_cx + head_r * 0.85, head_cy - head_r * 0.35)
        bib.lineTo(body_cx + body_rx * 0.35, body_cy - body_ry * 0.05)
        bib.close()
        _fill(c, bib, INK)

    _stroke(c, tail_path(), INK, 0.45)
    for i in range(4):
        if kind == "wren":
            _line(
                c,
                body_cx - body_rx * 0.7,
                body_cy + body_ry * 0.15,
                body_cx - body_rx * 0.4 + i * 0.6,
                body_cy + s * 0.38,
                BROWN,
                0.2,
            )
        else:
            _line(c, tail_len * 0.85, body_cy + body_ry * 0.1, 4, body_cy + (i - 1.5) * body_ry * 0.22, INK if dark else BROWN, 0.2)

    # folded wing, sitting on the flank
    c.saveState()
    c.translate(body_cx - body_rx * 0.05, body_cy + body_ry * 0.08)
    c.rotate(-16)
    wing = _ellipse(c, body_rx * 0.02, 0, body_rx * 0.88, body_ry * 0.78)
    if kind == "goldfinch":
        _fill(c, wing, GOLD)
    elif kind == "bluetit":
        _fill(c, wing, BLUE)
    elif dark:
        _fill(c, wing, cmyk("2c241c"))
    else:
        _fill(c, wing, cmyk("f3eadc"))

    def flight():
        c.setStrokeColor(INK if dark else BROWN)
        c.setLineWidth(0.25)
        for i in range(5):
            c.line(-body_rx * 0.2 + i * body_rx * 0.16, body_ry * 0.35, body_rx * 0.15 + i * body_rx * 0.1, -body_ry * 0.4)
        if kind == "wren":
            for i in range(4):
                c.line(-body_rx * 0.4, -body_ry * 0.3 + i * 2.1, body_rx * 0.45, -body_ry * 0.15 + i * 1.8)

    _in_clip(c, wing, flight)
    _stroke(c, wing, INK, 0.4)
    c.restoreState()

    _stroke(c, body, INK, 0.6)
    _stroke(c, head, INK, 0.6)

    bill_len = head_r * (1.55 if kind == "blackbird" else 0.85 if kind == "sparrow" else 1.15)
    bill_h = head_r * (0.34 if kind == "sparrow" else 0.2)
    bill_y = head_cy - head_r * 0.08
    bill = c.beginPath()
    bill.moveTo(head_cx + head_r * 0.72, bill_y + bill_h)
    bill.lineTo(head_cx + head_r * 0.72 + bill_len, bill_y + bill_h * 0.05)
    bill.lineTo(head_cx + head_r * 0.72, bill_y - bill_h * 0.7)
    bill.close()
    _fill(c, bill, GOLD_DEEP if kind == "blackbird" else SEPIA)
    _stroke(c, bill, INK, 0.35)
    _line(c, head_cx + head_r * 0.72, bill_y, head_cx + head_r * 0.72 + bill_len * 0.92, bill_y - bill_h * 0.05, INK, 0.15)

    eye_x = head_cx + head_r * 0.18
    eye_y = head_cy + head_r * 0.12
    c.setFillColor(CREAM)
    c.circle(eye_x, eye_y, head_r * 0.28, fill=1, stroke=0)
    c.setFillColor(INK)
    c.circle(eye_x + head_r * 0.04, eye_y, head_r * 0.16, fill=1, stroke=0)
    if kind == "robin":
        c.setStrokeColor(cmyk("edd9c8"))
        c.setLineWidth(0.4)
        c.circle(eye_x, eye_y, head_r * 0.34, fill=0, stroke=1)
    if kind == "blackbird":
        c.setStrokeColor(GOLD_DEEP)
        c.setLineWidth(0.55)
        c.circle(eye_x, eye_y, head_r * 0.4, fill=0, stroke=1)

    for foot in (body_cx - body_rx * 0.05, body_cx + body_rx * 0.42):
        _line(c, foot, body_cy - body_ry + 1, foot, 3.2, SEPIA, 0.55)
        _line(c, foot, 3.2, foot + s * 0.07, 2.2, SEPIA, 0.4)
        _line(c, foot, 3.2, foot + s * 0.045, 1.2, SEPIA, 0.4)
        _line(c, foot, 3.2, foot - s * 0.04, 2.4, SEPIA, 0.4)
    _line(c, body_cx - body_rx * 0.2, 2.4, body_cx + body_rx * 1.15, 1.6, BROWN, 0.8)
    _line(c, body_cx - body_rx * 0.2, 1.6, body_cx + body_rx * 1.15, 0.8, SEPIA, 0.3)
    c.restoreState()


def draw_plant(c, kind, cx, base, height) -> None:
    drawers = {
        "carrot": draw_carrot,
        "parsnip": draw_parsnip,
        "radish": draw_radish,
        "leek": draw_leek,
        "onion": draw_onion,
        "garlic": draw_garlic,
        "bean": draw_bean,
        "pea": draw_pea,
        "lettuce": draw_lettuce,
        "tomato": draw_tomato,
        "courgette": draw_courgette,
        "corn": draw_corn,
        "kale": draw_kale,
    }
    drawers[kind](c, cx, base, height)


def draw_plate(c, x, y, w, h, month: int) -> None:
    spec = PLATES[month]
    _paper(c, x + 6, y + 6, w - 12, h - 12, 20 + month)
    inset = 7 * MM
    c.setStrokeColor(SEPIA)
    c.setLineWidth(0.7)
    c.rect(x + inset, y + inset, w - 2 * inset, h - 2 * inset, fill=0, stroke=1)
    c.setLineWidth(0.25)
    c.rect(x + inset + 1.6 * MM, y + inset + 1.6 * MM, w - 2 * inset - 3.2 * MM, h - 2 * inset - 3.2 * MM, fill=0, stroke=1)

    caption_h = 16 * MM
    art_left = x + inset + 4 * MM
    art_right = x + w - inset - 4 * MM
    art_bottom = y + inset + caption_h
    art_top = y + h - inset - 4 * MM
    art_w = art_right - art_left
    art_h = art_top - art_bottom

    c.saveState()
    clip = c.beginPath()
    clip.rect(art_left, art_bottom, art_w, art_h)
    c.clipPath(clip, stroke=0, fill=0)

    plant_h = min(art_h * 0.9, art_w * 0.62)
    plant_cx = art_left + art_w * 0.32
    draw_plant(c, spec["plant"], plant_cx, art_bottom + max(0, (art_h - plant_h) * 0.08), plant_h)

    bird_s = min(art_h * 0.4, art_w * 0.2)
    if spec["bird"] == "wren":
        bird_s *= 0.82
    bird_x = art_right - bird_s * 1.65
    draw_bird(c, bird_x, art_bottom + art_h * 0.12, bird_s, spec["bird"], spec["face"])
    draw_detail(c, art_left + 1 * MM, art_bottom + 1 * MM, min(46, art_h * 0.2), spec["detail"])
    c.restoreState()

    mid = x + w / 2
    rule_y = y + inset + caption_h - 3 * MM
    _line(c, mid - 28 * MM, rule_y, mid + 28 * MM, rule_y, SEPIA, 0.3)
    number = ROMAN.get(month)
    c.setFillColor(INK)
    c.setFont("Roman", 10)
    label = f"Plate {number}" if number else "Plate"
    c.drawCentredString(mid, rule_y - 11, label)
    c.setFont("Roman", 8)
    c.drawCentredString(mid, rule_y - 22, spec["common"])
    c.setFillColor(SEPIA)
    c.setFont("Italic", 8)
    c.drawCentredString(mid, rule_y - 33, f"{spec['plant_latin']}    {spec['bird_latin']}")
