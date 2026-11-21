#!/usr/bin/env python3
"""Robin & Radish 2027 sowing calendar and timeline poster.

Original plates and wording. Crop months come from lib/crops.ts.
Bars cover whole months: the list is not split into early, mid and late.
Bank holidays are the England and Wales dates published on GOV.UK.
"""

from __future__ import annotations

import calendar
import json
import os
import subprocess
import sys
from datetime import date
from pathlib import Path

from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.colors import CMYKColor
from reportlab.pdfbase.pdfmetrics import stringWidth

from engravings import draw_plate

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path(__file__).resolve().parent / "fonts"
PUBLIC = ROOT / "public"
ARTIFACTS = Path("/tmp/rr-artifacts")
SITE = "robinandradish.co.uk"
MM = 72 / 25.4
# Set RR_RASTER_PLATES=1 when the print build drops the painted plates in afterwards.
RASTER_PLATES = os.environ.get("RR_RASTER_PLATES") == "1"

GROUPS = [
    ("Roots", ["carrots", "beetroot", "parsnips", "radishes", "early-potatoes", "maincrop-potatoes"]),
    ("Brassicas", ["kale", "summer-cabbage", "brussels-sprouts", "calabrese", "purple-sprouting-broccoli", "turnips", "swede"]),
    ("Legumes", ["broad-beans", "peas", "french-beans", "runner-beans"]),
    ("Salads and leaves", ["lettuce", "spinach", "chard", "rocket"]),
    ("Alliums", ["leeks", "onions", "onion-sets", "garlic", "spring-onions"]),
    ("Fruiting", ["tomatoes", "courgettes", "cucumbers", "sweetcorn", "chillies"]),
    ("Herbs", ["parsley", "coriander", "basil", "chives", "mint", "rosemary", "thyme"]),
]
JOBS = [
    ("sowIndoors", "Sow under cover", "1f4d38"),
    ("sowOutdoors", "Sow outside", "2f7d4f"),
    ("plant", "Plant out", "9a2e28"),
    ("harvest", "Harvest", "c4842a"),
]
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
LATIN = {
    "broad-beans": "Vicia faba",
    "peas": "Pisum sativum",
    "french-beans": "Phaseolus vulgaris",
    "runner-beans": "Phaseolus coccineus",
    "carrots": "Daucus carota",
    "beetroot": "Beta vulgaris",
    "parsnips": "Pastinaca sativa",
    "radishes": "Raphanus sativus",
    "lettuce": "Lactuca sativa",
    "spinach": "Spinacia oleracea",
    "kale": "Brassica oleracea",
    "summer-cabbage": "Brassica oleracea",
    "brussels-sprouts": "Brassica oleracea",
    "calabrese": "Brassica oleracea",
    "purple-sprouting-broccoli": "Brassica oleracea",
    "turnips": "Brassica rapa",
    "swede": "Brassica napus",
    "rocket": "Eruca vesicaria",
    "chillies": "Capsicum annuum",
    "leeks": "Allium porrum",
    "onions": "Allium cepa",
    "onion-sets": "Allium cepa",
    "garlic": "Allium sativum",
    "early-potatoes": "Solanum tuberosum",
    "maincrop-potatoes": "Solanum tuberosum",
    "tomatoes": "Solanum lycopersicum",
    "courgettes": "Cucurbita pepo",
    "cucumbers": "Cucumis sativus",
    "sweetcorn": "Zea mays",
    "chard": "Beta vulgaris",
    "spring-onions": "Allium cepa",
    "parsley": "Petroselinum crispum",
    "coriander": "Coriandrum sativum",
    "basil": "Ocimum basilicum",
    "chives": "Allium schoenoprasum",
    "mint": "Mentha spicata",
    "rosemary": "Salvia rosmarinus",
    "thyme": "Thymus vulgaris",
}
ICON = {
    "carrots": "root", "parsnips": "root", "beetroot": "globe", "radishes": "globe",
    "early-potatoes": "tuber", "maincrop-potatoes": "tuber",
    "kale": "leaf", "summer-cabbage": "leaf", "brussels-sprouts": "leaf",
    "calabrese": "leaf", "purple-sprouting-broccoli": "leaf", "turnips": "globe", "swede": "globe",
    "broad-beans": "pod", "peas": "pod", "french-beans": "pod", "runner-beans": "pod",
    "lettuce": "head", "spinach": "leaf", "chard": "leaf", "rocket": "leaf",
    "leeks": "leek", "onions": "bulb", "onion-sets": "bulb", "garlic": "bulb", "spring-onions": "leek",
    "tomatoes": "fruit", "courgettes": "fruit", "cucumbers": "fruit", "sweetcorn": "cob", "chillies": "fruit",
    "parsley": "herb", "coriander": "herb", "basil": "herb", "chives": "herb", "mint": "herb", "rosemary": "herb", "thyme": "herb",
}
# England and Wales, GOV.UK list for 2027. Scotland's dates differ.
HOLIDAYS = {
    date(2027, 1, 1): "New Year's Day",
    date(2027, 3, 26): "Good Friday",
    date(2027, 3, 29): "Easter Monday",
    date(2027, 5, 3): "Early May",
    date(2027, 5, 31): "Spring bank",
    date(2027, 8, 30): "Summer bank",
    date(2027, 12, 27): "Christmas Day (substitute)",
    date(2027, 12, 28): "Boxing Day (substitute)",
}
ADVICE = {
    1: "The soil is cold, and often wet. In the south, garlic can still go in where the ground is workable. January is not on the north list for garlic. Leeks and onions from seed can start on a bright windowsill in the south. Leave leeks and parsnips in the bed and lift them as you cook. Break the ice on a shallow dish for the birds.",
    2: "The days are getting longer. Broad beans and peas can start in pots under cover on both lists. Outdoor sowing of those beans is later in the north. Stand early potatoes in a light, frost-free place to chit. A nest box put up now is there before birds are choosing.",
    3: "A lot of outdoor sowing begins in the south this month: carrots, beetroot, parsnips, lettuce, peas. Early potatoes can be planted down south. The north list says April for those potatoes. Tomatoes can be sown under cover in the south. If the soil sticks to your boots, wait a few days.",
    4: "Keep sowing, and start French beans and courgettes in pots. Do not rush tender plants outside. A late frost still happens in April. If a cold night is forecast, a sheet or a cloche over a row is enough. Take it off in the morning.",
    5: "Frost, not the packet, decides when beans and courgettes go out. The south list starts planting them in May. The north list waits until June. Harden plants off before they go outside. There are two bank holiday Mondays. One of them is a good day to water, not to gamble.",
    6: "This is planting-out time for a lot of tender crops, including further north. Water runner beans at the root in a dry spell, or the flowers drop without setting. Pick peas while they are still sweet. A shallow dish of water matters as much as seed.",
    7: "Pick little and often. A courgette left to become a marrow slows the plant. Sow a short row of lettuce or radish if you want more leaves later. Fat balls go soft in warm weather. If they smear, take them down.",
    8: "Keep picking, and water pots whenever the compost is dry. A windy week dries a pot even when the lawn looks fine. Spinach and coriander can be sown again for autumn. One dry week is enough to stall a courgette.",
    9: "Sow lettuce under cover if you want a late picking. Onion sets can go in this month in the south. They are not on the northern list for autumn. Clear healthy bean stems onto the compost heap. Leave the kale standing.",
    10: "Garlic is the main planting on both lists, and broad beans can be sown outdoors too. Onion sets go in this month in the south, not on the northern list. Do not work soil that is sodden. Robins take mealworms from a ground tray. A hanging tube is a poor first offer for them.",
    11: "The sowing list is short. Broad beans outdoors in the south, if the soil is still open. Garlic can be planted on both lists. Pick kale, leeks and parsnips as you need them. Clean the feeders before the busy months. Put out what the birds will finish while it is fresh.",
    12: "Very little wants sowing. Garlic can still be planted in the south if the ground is not frozen. Pick winter leaves and leeks. Top the feeders up in the morning, and keep a dish of water. Do not add anything to the water to stop it freezing.",
}
BIRDS = {
    1: "Birds: break ice on a shallow dish in the morning. Mealworms on a tray suit robins.",
    2: "Birds: sunflower hearts and suet. Put nest boxes up before breeding starts.",
    3: "Birds: boxes are better up now. Keep whole peanuts in a mesh feeder.",
    4: "Birds: take suet down if a mild spell makes it smear. Parents also need insects.",
    5: "Birds: peanuts only in a mesh feeder while nests are in use.",
    6: "Birds: a shallow dish of water, changed when it is dirty.",
    7: "Birds: soft suet comes down. A small amount of fresh seed is enough.",
    8: "Birds: empty a green bird bath rather than topping it up.",
    9: "Birds: leave a few seed heads standing. Goldfinches use them.",
    10: "Birds: mealworms on a tray for robins. Soak dried ones first.",
    11: "Birds: suet and sunflower hearts. Rake up seed that has gone damp.",
    12: "Birds: fresh food in the morning, and water. No salt in the dish.",
}
PLATE = {
    1: ("leek", "robin", "Allium porrum", "Erithacus rubecula"),
    2: ("bean", "pea", "Vicia faba", "Pisum sativum"),
    3: ("carrot", "robin", "Daucus carota", "Erithacus rubecula"),
    4: ("lettuce", "beet", "Lactuca sativa", "Beta vulgaris"),
    5: ("bean", "fruit", "Phaseolus vulgaris", "Cucurbita pepo"),
    6: ("tomato", "robin", "Solanum lycopersicum", "Erithacus rubecula"),
    7: ("fruit", "pea", "Cucumis sativus", "Pisum sativum"),
    8: ("cob", "leaf", "Zea mays", "Spinacia oleracea"),
    9: ("bulb", "leaf", "Allium cepa", "Brassica oleracea"),
    10: ("garlic", "bean", "Allium sativum", "Vicia faba"),
    11: ("root", "leaf", "Pastinaca sativa", "Brassica oleracea"),
    12: ("robin", "leek", "Erithacus rubecula", "Allium porrum"),
}


def cmyk(hex_color: str) -> CMYKColor:
    value = hex_color.lstrip("#")
    red, green, blue = (int(value[i : i + 2], 16) / 255 for i in (0, 2, 4))
    black = 1 - max(red, green, blue)
    if black >= 0.999:
        return CMYKColor(0, 0, 0, 1)
    scale = 1 - black
    return CMYKColor((1 - red - black) / scale, (1 - green - black) / scale, (1 - blue - black) / scale, black)


CREAM = cmyk("f4efe4")
PAPER = cmyk("f7f1e4")
INK = cmyk("2c241c")
SEPIA = cmyk("5c4632")
GREEN = cmyk("1f4d38")
LEAF = cmyk("2f7d4f")
PALE = cmyk("e3efe4")
WASH = cmyk("f3e2d4")
RADISH = cmyk("9a2e28")
GOLD = cmyk("c4842a")
SOIL = cmyk("7a5436")
RULE = cmyk("d9d0c2")
JOB_COLOR = {key: cmyk(hex_color) for key, _label, hex_color in JOBS}


def load_crops() -> dict:
    script = r"""
import { crops } from "./lib/crops.ts";
process.stdout.write(JSON.stringify(crops.map((crop) => ({
  slug: crop.slug, name: crop.name,
  sowIndoors: crop.sowIndoors, sowOutdoors: crop.sowOutdoors,
  plant: crop.plant, harvest: crop.harvest,
}))));
"""
    result = subprocess.run(
        ["node", "--experimental-strip-types", "--input-type=module", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    crops = {crop["slug"]: crop for crop in json.loads(result.stdout)}
    seen = [slug for _label, slugs in GROUPS for slug in slugs]
    if set(seen) != set(crops) or len(seen) != len(crops):
        raise SystemExit("Calendar groups do not match the crop list.")
    return crops


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Sans", str(FONT_DIR / "source-sans-400.ttf")))
    pdfmetrics.registerFont(TTFont("SansBold", str(FONT_DIR / "source-sans-600.ttf")))
    pdfmetrics.registerFont(TTFont("Display", str(FONT_DIR / "fraunces-600.ttf")))
    pdfmetrics.registerFont(TTFont("Roman", str(FONT_DIR / "cormorant-regular.ttf")))
    pdfmetrics.registerFont(TTFont("Italic", str(FONT_DIR / "cormorant-italic.ttf")))


def wrap(text: str, font: str, size: float, width: float) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in text.split():
        trial = f"{current} {word}".strip()
        if stringWidth(trial, font, size) <= width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def reminders(month: int, crops: dict) -> list[str]:
    lines = []
    order = [slug for _label, slugs in GROUPS for slug in slugs]
    ordered = [crops[slug] for slug in order]
    for key, label, _hex in JOBS:
        chosen = [crop for crop in ordered if month in crop[key]["south"] or month in crop[key]["north"]]
        if not chosen:
            continue
        south = [crop for crop in chosen if month in crop[key]["south"]]
        north_only = [crop for crop in chosen if month in crop[key]["north"] and month not in crop[key]["south"]]
        if south:
            names = ", ".join(crop["name"].lower() for crop in south[:3])
            if len(south) > 3:
                names += ", and others"
            later = any(month not in crop[key]["north"] for crop in south)
            tail = " Some are later, or absent, on the north list." if later else ""
            lines.append(f"{label}: {names}.{tail}")
        elif north_only:
            names = ", ".join(crop["name"].lower() for crop in north_only[:3])
            lines.append(f"{label}, north list: {names}.")
        if len(lines) == 4:
            break
    lines.append(BIRDS[month])
    return lines[:5]


def crop_marks(c: canvas.Canvas, ox: float, oy: float, width: float, height: float, bleed: float) -> None:
    mark = 4 * MM
    gap = bleed + 1 * MM
    c.setStrokeColor(CMYKColor(0, 0, 0, 1))
    c.setLineWidth(0.35)
    for x, y, sx, sy in (
        (ox, oy, -1, -1),
        (ox + width, oy, 1, -1),
        (ox, oy + height, -1, 1),
        (ox + width, oy + height, 1, 1),
    ):
        c.line(x + sx * gap, y, x + sx * (gap + mark), y)
        c.line(x, y + sy * gap, x, y + sy * (gap + mark))


def washes(c: canvas.Canvas, x: float, y: float, w: float, h: float) -> None:
    c.setFillColor(PALE)
    c.ellipse(x + w * 0.15, y + h * 0.25, x + w * 0.72, y + h * 0.95, fill=1, stroke=0)
    c.setFillColor(WASH)
    c.ellipse(x + w * 0.4, y + h * 0.05, x + w * 0.95, y + h * 0.7, fill=1, stroke=0)


def icon(c: canvas.Canvas, kind: str, x: float, y: float, s: float, color: CMYKColor = GREEN) -> None:
    c.saveState()
    c.setStrokeColor(color)
    c.setFillColor(color)
    c.setLineWidth(max(0.6, s * 0.08))
    c.setLineCap(1)
    if kind == "root":
        c.line(x + s * 0.5, y + s * 0.55, x + s * 0.5, y + s)
        c.line(x + s * 0.2, y + s * 0.75, x + s * 0.8, y + s * 0.85)
        path = c.beginPath()
        path.moveTo(x + s * 0.5, y + s * 0.62)
        path.curveTo(x + s * 0.15, y + s * 0.4, x + s * 0.2, y + s * 0.08, x + s * 0.5, y)
        path.curveTo(x + s * 0.8, y + s * 0.08, x + s * 0.85, y + s * 0.4, x + s * 0.5, y + s * 0.62)
        c.setFillColor(CREAM)
        c.drawPath(path, fill=1, stroke=1)
    elif kind == "globe":
        c.circle(x + s * 0.5, y + s * 0.32, s * 0.28, fill=0, stroke=1)
        c.line(x + s * 0.5, y + s * 0.58, x + s * 0.5, y + s)
        c.line(x + s * 0.25, y + s * 0.78, x + s * 0.7, y + s * 0.9)
    elif kind == "tuber":
        c.roundRect(x + s * 0.18, y + s * 0.22, s * 0.64, s * 0.36, s * 0.16, fill=0, stroke=1)
        c.circle(x + s * 0.38, y + s * 0.4, s * 0.04, fill=1, stroke=0)
        c.circle(x + s * 0.58, y + s * 0.36, s * 0.04, fill=1, stroke=0)
    elif kind == "leaf":
        path = c.beginPath()
        path.moveTo(x + s * 0.5, y)
        path.curveTo(x + s * 0.05, y + s * 0.35, x + s * 0.15, y + s * 0.85, x + s * 0.5, y + s)
        path.curveTo(x + s * 0.85, y + s * 0.85, x + s * 0.95, y + s * 0.35, x + s * 0.5, y)
        c.setFillColor(CREAM)
        c.drawPath(path, fill=1, stroke=1)
        c.line(x + s * 0.5, y + s * 0.15, x + s * 0.5, y + s * 0.88)
    elif kind == "pod":
        c.line(x + s * 0.3, y, x + s * 0.55, y + s)
        path = c.beginPath()
        path.moveTo(x + s * 0.42, y + s * 0.2)
        path.curveTo(x + s * 0.85, y + s * 0.25, x + s * 0.8, y + s * 0.8, x + s * 0.48, y + s * 0.72)
        c.drawPath(path, fill=0, stroke=1)
    elif kind == "head":
        c.circle(x + s * 0.5, y + s * 0.42, s * 0.32, fill=0, stroke=1)
        c.line(x + s * 0.5, y + s * 0.72, x + s * 0.35, y + s)
        c.line(x + s * 0.5, y + s * 0.72, x + s * 0.68, y + s * 0.95)
    elif kind == "leek":
        c.line(x + s * 0.5, y, x + s * 0.5, y + s * 0.7)
        c.line(x + s * 0.28, y + s * 0.55, x + s * 0.5, y + s)
        c.line(x + s * 0.72, y + s * 0.5, x + s * 0.5, y + s * 0.95)
    elif kind == "bulb":
        c.circle(x + s * 0.5, y + s * 0.32, s * 0.26, fill=0, stroke=1)
        c.line(x + s * 0.5, y + s * 0.56, x + s * 0.5, y + s * 0.95)
        c.line(x + s * 0.3, y + s * 0.7, x + s * 0.62, y + s)
    elif kind == "fruit":
        c.circle(x + s * 0.48, y + s * 0.38, s * 0.28, fill=0, stroke=1)
        c.line(x + s * 0.48, y + s * 0.64, x + s * 0.6, y + s * 0.9)
    elif kind == "cob":
        c.roundRect(x + s * 0.38, y + s * 0.12, s * 0.24, s * 0.62, s * 0.1, fill=0, stroke=1)
        c.line(x + s * 0.28, y + s * 0.7, x + s * 0.7, y + s)
    else:
        c.line(x + s * 0.5, y, x + s * 0.5, y + s * 0.8)
        c.circle(x + s * 0.32, y + s * 0.62, s * 0.16, fill=0, stroke=1)
        c.circle(x + s * 0.66, y + s * 0.78, s * 0.14, fill=0, stroke=1)
    c.restoreState()


def draw_robin(c: canvas.Canvas, x: float, y: float, s: float) -> None:
    c.setStrokeColor(SOIL)
    c.setLineWidth(1.5)
    c.line(x + s * 0.08, y + s * 0.08, x + s * 1.05, y + s * 0.08)
    c.setStrokeColor(SEPIA)
    c.setFillColor(SEPIA)
    tail = c.beginPath()
    tail.moveTo(x + s * 0.28, y + s * 0.38)
    tail.lineTo(x, y + s * 0.55)
    tail.lineTo(x + s * 0.08, y + s * 0.28)
    tail.close()
    c.drawPath(tail, fill=1, stroke=0)
    c.setFillColor(PAPER)
    c.setStrokeColor(SEPIA)
    c.setLineWidth(1.3)
    c.ellipse(x + s * 0.22, y + s * 0.2, x + s * 0.95, y + s * 0.62, fill=1, stroke=1)
    c.setFillColor(RADISH)
    breast = c.beginPath()
    breast.moveTo(x + s * 0.58, y + s * 0.28)
    breast.curveTo(x + s * 0.95, y + s * 0.3, x + s * 1.05, y + s * 0.5, x + s * 0.72, y + s * 0.55)
    breast.curveTo(x + s * 0.55, y + s * 0.48, x + s * 0.5, y + s * 0.34, x + s * 0.58, y + s * 0.28)
    c.drawPath(breast, fill=1, stroke=0)
    c.setStrokeColor(SEPIA)
    c.setLineWidth(0.8)
    c.line(x + s * 0.42, y + s * 0.48, x + s * 0.72, y + s * 0.42)
    c.line(x + s * 0.4, y + s * 0.4, x + s * 0.68, y + s * 0.34)
    c.setFillColor(PAPER)
    c.circle(x + s * 0.78, y + s * 0.58, s * 0.16, fill=1, stroke=1)
    c.setFillColor(INK)
    c.circle(x + s * 0.84, y + s * 0.62, s * 0.028, fill=1, stroke=0)
    c.setFillColor(GOLD)
    beak = c.beginPath()
    beak.moveTo(x + s * 0.9, y + s * 0.56)
    beak.lineTo(x + s * 1.18, y + s * 0.52)
    beak.lineTo(x + s * 0.92, y + s * 0.48)
    beak.close()
    c.drawPath(beak, fill=1, stroke=0)
    c.setStrokeColor(SOIL)
    c.setLineWidth(0.9)
    c.line(x + s * 0.48, y + s * 0.2, x + s * 0.46, y + s * 0.08)
    c.line(x + s * 0.68, y + s * 0.2, x + s * 0.72, y + s * 0.08)


def _leaf_fan(c: canvas.Canvas, x: float, y: float, s: float, n: int = 5) -> None:
    c.setStrokeColor(LEAF)
    c.setLineWidth(1.3)
    c.setLineCap(1)
    for i in range(n):
        spread = (i - (n - 1) / 2) * s * 0.16
        tip_x = x + spread
        tip_y = y + s * (0.72 + (0.12 if i % 2 == 0 else 0))
        path = c.beginPath()
        path.moveTo(x, y)
        path.curveTo(x + spread * 0.3, y + s * 0.25, tip_x, y + s * 0.45, tip_x, tip_y)
        c.drawPath(path, stroke=1, fill=0)


def motif(c: canvas.Canvas, kind: str, x: float, y: float, s: float) -> None:
    if kind == "robin":
        draw_robin(c, x, y, s)
        return
    c.setLineCap(1)
    if kind in {"carrot", "root"}:
        path = c.beginPath()
        path.moveTo(x + s * 0.42, y + s * 0.58)
        path.curveTo(x + s * 0.08, y + s * 0.4, x + s * 0.22, y + s * 0.08, x + s * 0.46, y)
        path.curveTo(x + s * 0.72, y + s * 0.08, x + s * 0.82, y + s * 0.4, x + s * 0.42, y + s * 0.58)
        c.setFillColor(GOLD)
        c.setStrokeColor(SOIL)
        c.setLineWidth(1.2)
        c.drawPath(path, fill=1, stroke=1)
        c.setStrokeColor(SOIL)
        c.setLineWidth(0.5)
        c.line(x + s * 0.46, y + s * 0.12, x + s * 0.44, y + s * 0.48)
        _leaf_fan(c, x + s * 0.42, y + s * 0.55, s * 0.55, 6)
    elif kind == "beet":
        c.setFillColor(RADISH)
        c.setStrokeColor(SEPIA)
        c.setLineWidth(1)
        c.circle(x + s * 0.4, y + s * 0.28, s * 0.24, fill=1, stroke=1)
        c.setStrokeColor(RADISH)
        c.setLineWidth(0.6)
        c.circle(x + s * 0.4, y + s * 0.28, s * 0.14, fill=0, stroke=1)
        _leaf_fan(c, x + s * 0.4, y + s * 0.5, s * 0.55, 4)
    elif kind == "lettuce":
        c.setFillColor(LEAF)
        c.setStrokeColor(GREEN)
        c.setLineWidth(1)
        for dx, dy, r in ((0, 0, 0.22), (-0.16, 0.08, 0.16), (0.16, 0.06, 0.15), (0, 0.16, 0.12)):
            c.circle(x + s * (0.4 + dx), y + s * (0.28 + dy), s * r, fill=1, stroke=1)
    elif kind in {"bean", "pea"}:
        c.setStrokeColor(GREEN)
        c.setLineWidth(1.4)
        c.line(x + s * 0.28, y + s * 0.15, x + s * 0.42, y + s * 0.95)
        pod = c.beginPath()
        pod.moveTo(x + s * 0.36, y + s * 0.22)
        pod.curveTo(x + s * 0.78, y + s * 0.18, x + s * 0.74, y + s * 0.72, x + s * 0.4, y + s * 0.68)
        pod.curveTo(x + s * 0.62, y + s * 0.7, x + s * 0.66, y + s * 0.28, x + s * 0.36, y + s * 0.22)
        c.setFillColor(PALE)
        c.drawPath(pod, fill=1, stroke=1)
        c.setFillColor(GREEN)
        for i in range(3):
            c.circle(x + s * (0.46 + i * 0.08), y + s * (0.36 + i * 0.08), s * 0.035, fill=1, stroke=0)
        if kind == "pea":
            tendril = c.beginPath()
            tendril.moveTo(x + s * 0.42, y + s * 0.9)
            tendril.curveTo(x + s * 0.55, y + s, x + s * 0.5, y + s * 0.82, x + s * 0.6, y + s * 0.92)
            c.drawPath(tendril, stroke=1, fill=0)
    elif kind == "fruit":
        c.setFillColor(LEAF)
        c.setStrokeColor(GREEN)
        c.setLineWidth(1.1)
        c.roundRect(x + s * 0.22, y + s * 0.16, s * 0.48, s * 0.22, s * 0.1, fill=1, stroke=1)
        c.setStrokeColor(GREEN)
        c.line(x + s * 0.4, y + s * 0.38, x + s * 0.28, y + s * 0.78)
        c.line(x + s * 0.28, y + s * 0.78, x + s * 0.48, y + s * 0.7)
    elif kind == "tomato":
        c.setFillColor(RADISH)
        c.setStrokeColor(SEPIA)
        c.setLineWidth(1)
        c.circle(x + s * 0.4, y + s * 0.32, s * 0.24, fill=1, stroke=1)
        c.setFillColor(LEAF)
        for dx, dy in ((-0.1, 0.07), (-0.03, 0.1), (0.05, 0.1), (0.11, 0.06)):
            leaf = c.beginPath()
            leaf.moveTo(x + s * 0.4, y + s * 0.5)
            leaf.lineTo(x + s * (0.4 + dx), y + s * (0.5 + dy))
            leaf.lineTo(x + s * (0.4 + dx * 0.35), y + s * 0.48)
            leaf.close()
            c.drawPath(leaf, fill=1, stroke=0)
        c.setStrokeColor(GREEN)
        c.setLineWidth(1.3)
        c.line(x + s * 0.4, y + s * 0.52, x + s * 0.4, y + s * 0.68)
    elif kind == "cob":
        c.setFillColor(GOLD)
        c.setStrokeColor(SOIL)
        c.setLineWidth(1)
        c.roundRect(x + s * 0.34, y + s * 0.1, s * 0.22, s * 0.48, s * 0.08, fill=1, stroke=1)
        c.setStrokeColor(LEAF)
        c.setFillColor(LEAF)
        c.setLineWidth(1.2)
        husk = c.beginPath()
        husk.moveTo(x + s * 0.34, y + s * 0.4)
        husk.curveTo(x + s * 0.1, y + s * 0.55, x + s * 0.2, y + s * 0.9, x + s * 0.42, y + s * 0.95)
        husk.curveTo(x + s * 0.3, y + s * 0.7, x + s * 0.36, y + s * 0.5, x + s * 0.4, y + s * 0.45)
        c.drawPath(husk, fill=1, stroke=1)
    elif kind == "leaf":
        path = c.beginPath()
        path.moveTo(x + s * 0.42, y + s * 0.05)
        path.curveTo(x + s * 0.02, y + s * 0.35, x + s * 0.12, y + s * 0.85, x + s * 0.42, y + s * 0.98)
        path.curveTo(x + s * 0.72, y + s * 0.85, x + s * 0.82, y + s * 0.35, x + s * 0.42, y + s * 0.05)
        c.setFillColor(LEAF)
        c.setStrokeColor(GREEN)
        c.setLineWidth(1.1)
        c.drawPath(path, fill=1, stroke=1)
        c.setStrokeColor(GREEN)
        c.setLineWidth(0.6)
        c.line(x + s * 0.42, y + s * 0.12, x + s * 0.42, y + s * 0.9)
        c.line(x + s * 0.42, y + s * 0.55, x + s * 0.22, y + s * 0.7)
        c.line(x + s * 0.42, y + s * 0.55, x + s * 0.62, y + s * 0.72)
    elif kind == "bulb":
        c.setFillColor(GOLD)
        c.setStrokeColor(SOIL)
        c.setLineWidth(1.1)
        c.circle(x + s * 0.4, y + s * 0.28, s * 0.22, fill=1, stroke=1)
        c.setStrokeColor(SOIL)
        c.setLineWidth(0.5)
        c.arc(x + s * 0.22, y + s * 0.1, x + s * 0.58, y + s * 0.46, 200, 80)
        c.setStrokeColor(LEAF)
        c.setLineWidth(1.5)
        c.line(x + s * 0.4, y + s * 0.48, x + s * 0.28, y + s * 0.92)
        c.line(x + s * 0.4, y + s * 0.48, x + s * 0.55, y + s * 0.88)
    elif kind == "garlic":
        c.setFillColor(PAPER)
        c.setStrokeColor(SOIL)
        c.setLineWidth(1.1)
        c.circle(x + s * 0.4, y + s * 0.3, s * 0.2, fill=1, stroke=1)
        c.circle(x + s * 0.28, y + s * 0.26, s * 0.1, fill=1, stroke=1)
        c.circle(x + s * 0.52, y + s * 0.26, s * 0.1, fill=1, stroke=1)
        c.setStrokeColor(LEAF)
        c.setLineWidth(1.3)
        c.line(x + s * 0.4, y + s * 0.48, x + s * 0.4, y + s * 0.88)
    elif kind == "leek":
        c.setStrokeColor(PALE)
        c.setFillColor(PAPER)
        c.setLineWidth(1.2)
        c.roundRect(x + s * 0.32, y + s * 0.05, s * 0.16, s * 0.48, 2, fill=1, stroke=1)
        c.setStrokeColor(LEAF)
        c.setLineWidth(1.6)
        c.line(x + s * 0.4, y + s * 0.5, x + s * 0.18, y + s * 0.95)
        c.line(x + s * 0.4, y + s * 0.5, x + s * 0.4, y + s)
        c.line(x + s * 0.4, y + s * 0.5, x + s * 0.64, y + s * 0.92)
    else:
        draw_robin(c, x, y, s)


def plate(c: canvas.Canvas, x: float, y: float, w: float, h: float, month: int, caption: str) -> None:
    washes(c, x, y, w, h)
    left_kind, right_kind, latin_a, latin_b = PLATE[month]
    inset = 8 * MM
    c.setStrokeColor(SEPIA)
    c.setLineWidth(1.25)
    c.rect(x + inset, y + inset, w - 2 * inset, h - 2 * inset, fill=0, stroke=1)
    c.setLineWidth(0.35)
    c.rect(x + inset + 2.4 * MM, y + inset + 2.4 * MM, w - 2 * inset - 4.8 * MM, h - 2 * inset - 4.8 * MM, fill=0, stroke=1)
    c.saveState()
    clip = c.beginPath()
    clip.rect(x + inset + 3 * MM, y + inset + 18 * MM, w - 2 * inset - 6 * MM, h - 2 * inset - 24 * MM)
    c.clipPath(clip, stroke=0, fill=0)
    motif(c, left_kind, x + w * 0.16, y + h * 0.34, min(h * 0.46, w * 0.26))
    motif(c, right_kind, x + w * 0.46, y + h * 0.32, min(h * 0.42, w * 0.24))
    c.restoreState()
    cap_w = min(w * 0.58, 130 * MM)
    cap_h = 12 * MM
    cap_x = x + inset + 5 * MM
    cap_y = y + inset + 4.5 * MM
    c.setFillColor(PAPER)
    c.setStrokeColor(SEPIA)
    c.setLineWidth(0.6)
    c.rect(cap_x, cap_y, cap_w, cap_h, fill=1, stroke=1)
    c.setFillColor(INK)
    c.setFont("Sans", 8)
    c.drawString(cap_x + 4 * MM, cap_y + 7 * MM, caption)
    c.setFillColor(SEPIA)
    c.setFont("Sans", 7)
    c.drawString(cap_x + 4 * MM, cap_y + 3.2 * MM, f"{latin_a}    ·    {latin_b}")


def footer(c: canvas.Canvas, x: float, y: float, w: float, holidays: bool = False) -> None:
    url_w = stringWidth(SITE, "SansBold", 7)
    note = "South: southern England, the Midlands and much of Wales. North: northern England and Scotland. Ranges, not a forecast."
    if holidays:
        note += " Bank holidays shown are England and Wales."
    lines = wrap(note, "Sans", 6.5, w - url_w - 8)
    c.setFillColor(GREEN)
    c.setFont("SansBold", 7)
    c.drawRightString(x + w, y + 16, SITE)
    c.setFillColor(SEPIA)
    c.setFont("Sans", 6.5)
    line_y = y + 16
    for line in lines[:2]:
        c.drawString(x, line_y, line)
        line_y -= 8


def draw_cover(c: canvas.Canvas, ox: float, oy: float, w: float, h: float) -> None:
    c.setFillColor(INK)
    c.setFont("Sans", 9)
    c.drawString(ox + 14 * MM, oy + h - 14 * MM, "ROBIN & RADISH   ·   A HOME GARDEN RECORD")
    c.setFont("Display", 32)
    c.drawString(ox + 14 * MM, oy + h - 28 * MM, "UK Sowing Calendar")
    c.setFillColor(RADISH)
    c.setFont("Display", 24)
    c.drawString(ox + 14 * MM, oy + h - 39 * MM, "2027")
    c.setFillColor(SEPIA)
    c.setFont("Sans", 10)
    text = "Twelve months for a home garden. The crops on this site, with the south and north ranges from the same list. The plates are drawings made for the calendar. They are not photographs, and they are not a picture of one garden."
    y = oy + h - 48 * MM
    for line in wrap(text, "Sans", 10, w - 28 * MM):
        c.drawString(ox + 14 * MM, y, line)
        y -= 13
    plate_top = y - 4 * MM
    plate_bottom = oy + 16 * MM
    if not RASTER_PLATES:
        draw_plate(c, ox + 6 * MM, plate_bottom, w - 12 * MM, plate_top - plate_bottom, 0)
    footer(c, ox + 14 * MM, oy + 4 * MM, w - 28 * MM)


def draw_month(c: canvas.Canvas, ox: float, oy: float, w: float, h: float, month: int, crops: dict) -> None:
    top_h = h * 0.46
    if not RASTER_PLATES:
        draw_plate(c, ox, oy + h - top_h, w, top_h, month)

    left = ox + 11 * MM
    right = ox + w - 11 * MM
    title_y = oy + h - top_h - 8 * MM
    c.setFillColor(INK)
    c.setFont("Display", 18)
    c.drawString(left, title_y, f"{MONTHS[month - 1]} 2027")
    c.setStrokeColor(SEPIA)
    c.setLineWidth(0.6)
    c.line(left, title_y - 2.4 * MM, left + 48 * MM, title_y - 2.4 * MM)

    advice_lines = wrap(ADVICE[month], "Sans", 8, right - left - 8)[:3]
    box_h = 16 + len(advice_lines) * 10
    box_y = title_y - 5 * MM - box_h
    c.setStrokeColor(RULE)
    c.setFillColor(PAPER)
    c.roundRect(left, box_y, right - left, box_h, 3, fill=1, stroke=1)
    c.setFillColor(GREEN)
    c.setFont("SansBold", 8)
    c.drawString(left + 5, box_y + box_h - 11, "This month")
    c.setFillColor(INK)
    c.setFont("Sans", 8)
    text_y = box_y + box_h - 22
    for line in advice_lines:
        c.drawString(left + 5, text_y, line)
        text_y -= 10

    notes_w = 54 * MM
    grid_right = right - notes_w - 4 * MM
    head_y = box_y - 6 * MM
    grid_bottom = oy + 18 * MM
    weeks = calendar.Calendar(firstweekday=0).monthdayscalendar(2027, month)
    col_w = (grid_right - left) / 7
    c.setFillColor(SOIL)
    c.setFont("Italic", 8)
    for index, name in enumerate(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]):
        c.drawString(left + index * col_w + 3, head_y, name)
    row_count = max(5, len(weeks))
    row_h = (head_y - 10 - grid_bottom) / row_count
    grid_top = head_y - 6
    c.setStrokeColor(SEPIA)
    c.setLineWidth(0.3)
    for row in range(row_count + 1):
        line_y = grid_top - row * row_h
        c.line(left, line_y, grid_right, line_y)
    for col in range(8):
        c.line(left + col * col_w, grid_top - row_count * row_h, left + col * col_w, grid_top)
    for row, week in enumerate(weeks):
        cell_top = grid_top - row * row_h
        cell_bottom = cell_top - row_h
        for col, day in enumerate(week):
            if not day:
                continue
            holiday = HOLIDAYS.get(date(2027, month, day))
            cell_x = left + col * col_w
            c.setFillColor(RADISH if holiday else INK)
            c.setFont("Roman", 9)
            c.drawString(cell_x + 3.5, cell_top - 11, str(day))
            if holiday:
                c.setFillColor(RADISH)
                c.setFont("Italic", 6)
                holiday_y = cell_bottom + 4
                for line in wrap(holiday, "Italic", 6, col_w - 6)[:2]:
                    c.drawString(cell_x + 3.5, holiday_y, line)
                    holiday_y += 7

    note_x = grid_right + 4 * MM
    c.setFillColor(RADISH)
    c.setFont("SansBold", 8)
    c.drawString(note_x, head_y, "Through the month")
    c.setFillColor(SEPIA)
    c.setFont("Sans", 7)
    note_y = head_y - 12
    for note in reminders(month, crops):
        for line in wrap(note, "Sans", 7, notes_w)[:3]:
            if note_y < grid_bottom:
                break
            c.drawString(note_x, note_y, line)
            note_y -= 8.5
        note_y -= 3
    c.setFillColor(SEPIA)
    c.setFont("Sans", 6.5)
    c.drawString(left, oy + 13 * MM, "Jobs run through the month. They are not pinned to one day. Crop pages give the north and south ranges.")
    footer(c, left, oy + 3 * MM, right - left, holidays=True)


def month_spans(months: set[int]) -> list[tuple[int, int]]:
    found: list[tuple[int, int]] = []
    start = None
    prev = None
    for month in range(1, 13):
        if month in months:
            if start is None:
                start = month
            prev = month
        elif start is not None:
            found.append((start, prev))
            start = None
    if start is not None and prev is not None:
        found.append((start, prev))
    return found


def draw_overview(c: canvas.Canvas, ox: float, oy: float, w: float, h: float, crops: dict) -> None:
    left = ox + 12 * MM
    right = ox + w - 12 * MM
    c.setFillColor(INK)
    c.setFont("Display", 22)
    c.drawString(left, oy + h - 16 * MM, "Year at a glance")
    c.setFillColor(SEPIA)
    c.setFont("Sans", 8.5)
    intro = "Whole months only. A bar fills every third of a month because this list does not say early, mid or late. Filled bars are the south list. A hollow bar is a month on the north list when the south list does not include it."
    y = oy + h - 22 * MM
    for line in wrap(intro, "Sans", 8.5, right - left):
        c.drawString(left, y, line)
        y -= 11
    key_y = y - 4 * MM
    cursor = left
    for key, label, _hex in JOBS:
        c.setFillColor(JOB_COLOR[key])
        c.roundRect(cursor, key_y, 16, 7, 3, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("Sans", 8)
        c.drawString(cursor + 20, key_y + 1, label)
        cursor += 20 + stringWidth(label, "Sans", 8) + 14
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.8)
    c.roundRect(cursor, key_y, 16, 7, 3, fill=0, stroke=1)
    c.setFillColor(INK)
    c.drawString(cursor + 20, key_y + 1, "North only")

    rows = [("group", label, None) for label, _slugs in GROUPS]
    # rebuild with crops
    rows = []
    for label, slugs in GROUPS:
        rows.append(("group", label, None))
        for slug in slugs:
            rows.append(("crop", crops[slug]["name"], crops[slug]))
    table_top = key_y - 9 * MM
    table_bottom = oy + 18 * MM
    label_w = 38 * MM
    grid_left = left + label_w
    col_w = (right - grid_left) / 12
    group_h = 5.2 * MM
    crop_count = sum(1 for kind, _label, _crop in rows if kind == "crop")
    crop_h = (table_top - table_bottom - len(GROUPS) * group_h) / crop_count
    yy = table_top
    c.setFillColor(SOIL)
    c.setFont("SansBold", 7)
    for index, name in enumerate(["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]):
        c.drawCentredString(grid_left + (index + 0.5) * col_w, table_top + 10, name)
    stripe = cmyk("ede4d3")
    crop_index = 0
    for kind, label, crop in rows:
        height = group_h if kind == "group" else crop_h
        yy -= height
        if kind == "crop":
            if crop_index % 2 == 1:
                c.setFillColor(stripe)
                c.rect(left, yy, right - left, height, fill=1, stroke=0)
            c.setStrokeColor(RULE)
            c.setLineWidth(0.4)
            c.line(left, yy, right, yy)
            crop_index += 1
        else:
            crop_index = 0
        if kind == "group":
            c.setFillColor(GREEN)
            c.rect(left, yy, right - left, height, fill=1, stroke=0)
            c.setFillColor(CREAM)
            c.setFont("SansBold", 7.5)
            c.drawString(left + 3, yy + 3, label.upper())
            continue
        c.setFillColor(INK)
        name_size = 8
        while name_size > 5 and stringWidth(label, "Sans", name_size) > label_w - 6:
            name_size -= 0.25
        c.setFont("Sans", name_size)
        c.drawString(left + 2, yy + height / 2 - name_size * 0.35, label)
        pad = 1.2
        lane = (height - 2 * pad) / 4
        for index, (key, _name, _hex) in enumerate(JOBS):
            south = set(crop[key]["south"])
            north = set(crop[key]["north"])
            ly = yy + pad + (3 - index) * lane
            for month in range(1, 13):
                cx = grid_left + (month - 1) * col_w
                if month in south or month in north:
                    hollow = month not in south
                    color = JOB_COLOR[key]
                    if hollow:
                        c.setStrokeColor(color)
                        c.setLineWidth(0.6)
                        c.setFillColor(CREAM)
                        c.roundRect(cx + 1, ly + 0.4, col_w - 2, lane - 0.8, 1.2, fill=1, stroke=1)
                    else:
                        c.setFillColor(color)
                        c.roundRect(cx + 1, ly + 0.4, col_w - 2, lane - 0.8, 1.2, fill=1, stroke=0)
    footer(c, left, oy + 4 * MM, right - left)


def draw_wallchart(c: canvas.Canvas, ox: float, oy: float, w: float, h: float, crops: dict) -> None:
    left = ox + 14 * MM
    right = ox + w - 12 * MM
    c.setFillColor(INK)
    c.setFont("Display", 20 if w > 500 else 16)
    c.drawString(left, oy + h - 12 * MM, "UK sowing timeline  2027")
    c.setFillColor(GREEN)
    c.setFont("Sans", 9)
    c.drawString(left, oy + h - 17 * MM, "Robin & Radish")
    c.setFillColor(SEPIA)
    c.setFont("Sans", 8)
    note = "Each pill fills the whole month. The E, M and L marks are only a ruler. This list does not choose a third inside the month. Filled pills are the south list. An outline is a month on the north list when the south list does not include it."
    y = oy + h - 22 * MM
    for line in wrap(note, "Sans", 8, right - left - 40 * MM):
        c.drawString(left, y, line)
        y -= 10
    cursor = left
    y -= 4
    for key, label, _hex in JOBS:
        c.setFillColor(JOB_COLOR[key])
        c.roundRect(cursor, y, 18, 7, 3.5, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("Sans", 8)
        c.drawString(cursor + 22, y + 1, label)
        cursor += 22 + stringWidth(label, "Sans", 8) + 12
    table_top = y - 8 * MM
    table_bottom = oy + 16 * MM
    label_w = 42 * MM
    grid_left = left + label_w
    col_w = (right - grid_left) / 12
    third = col_w / 3
    rows = []
    for label, slugs in GROUPS:
        rows.append(("group", label, None))
        for slug in slugs:
            rows.append(("crop", crops[slug], slug))
    group_h = 4.2 * MM
    crop_count = sum(1 for kind, _payload, _slug in rows if kind == "crop")
    crop_h = (table_top - table_bottom - len(GROUPS) * group_h) / crop_count
    c.setFillColor(SOIL)
    c.setFont("SansBold", 7)
    for index, name in enumerate(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]):
        cx = grid_left + index * col_w
        c.drawCentredString(cx + col_w / 2, table_top + 8, name)
        c.setFont("Sans", 5.5)
        c.setFillColor(SEPIA)
        for tick, mark in enumerate("EML"):
            c.drawCentredString(cx + (tick + 0.5) * third, table_top + 1, mark)
        c.setFont("SansBold", 7)
        c.setFillColor(SOIL)
    yy = table_top
    for kind, payload, slug in rows:
        if kind == "group":
            yy -= group_h
            c.setFillColor(GREEN)
            c.rect(left, yy, label_w - 2 * MM, group_h - 1, fill=1, stroke=0)
            c.setFillColor(CREAM)
            c.setFont("SansBold", 7)
            c.drawString(left + 3, yy + 2.5, str(payload).upper())
            continue
        yy -= crop_h
        crop = payload
        mark = min(crop_h * 0.55, 3.2 * MM)
        icon(c, ICON[slug], left, yy + (crop_h - mark) * 0.45, mark, GREEN)
        c.setFillColor(INK)
        name = crop["name"]
        name_size = 7.5
        while name_size > 5 and stringWidth(name, "Sans", name_size) > label_w - mark - 6:
            name_size -= 0.25
        c.setFont("Sans", name_size)
        c.drawString(left + mark + 2, yy + crop_h * 0.32, name)
        c.setStrokeColor(RULE)
        c.setLineWidth(0.25)
        for month_index in range(12):
            for tick in range(1, 3):
                c.line(
                    grid_left + month_index * col_w + tick * third,
                    yy + 0.6,
                    grid_left + month_index * col_w + tick * third,
                    yy + crop_h - 0.6,
                )
        lane_h = (crop_h - 1.4) / 4
        pill_h = max(1.5, lane_h - 0.7)
        for index, (key, _label, _hex) in enumerate(JOBS):
            south = set(crop[key]["south"])
            north = set(crop[key]["north"])
            ly = yy + 0.6 + (3 - index) * lane_h
            for start, end in month_spans(south):
                x1 = grid_left + (start - 1) * col_w + 0.7
                x2 = grid_left + end * col_w - 0.7
                c.setFillColor(JOB_COLOR[key])
                c.roundRect(x1, ly, max(1.2, x2 - x1), pill_h, pill_h / 2, fill=1, stroke=0)
            for start, end in month_spans(north - south):
                x1 = grid_left + (start - 1) * col_w + 0.7
                x2 = grid_left + end * col_w - 0.7
                c.setStrokeColor(JOB_COLOR[key])
                c.setFillColor(CREAM)
                c.setLineWidth(0.7)
                c.roundRect(x1, ly, max(1.2, x2 - x1), pill_h, pill_h / 2, fill=1, stroke=1)
    footer(c, left, oy + 4 * MM, right - left)


def render_pdf(path: Path, trim: tuple[float, float], bleed: float, draw_pages) -> None:
    trim_w, trim_h = trim
    slug = 5 * MM if bleed else 0
    inset = bleed + slug
    media = (trim_w + inset * 2, trim_h + inset * 2)
    c = canvas.Canvas(str(path), pagesize=media)
    c.setTitle("Robin & Radish UK Sowing Calendar 2027")
    c.setAuthor("Robin & Radish")
    draw_pages(c, inset, trim_w, trim_h, bleed, slug)
    c.save()
    if bleed:
        stamp_boxes(path, trim_w, trim_h, bleed, slug)


def paint_page(c: canvas.Canvas, inset: float, trim_w: float, trim_h: float, bleed: float, slug: float) -> None:
    c.setFillColor(CREAM)
    c.rect(slug, slug, trim_w + bleed * 2, trim_h + bleed * 2, fill=1, stroke=0)


def stamp_boxes(path: Path, trim_w: float, trim_h: float, bleed: float, slug: float) -> None:
    import pymupdf

    doc = pymupdf.open(path)
    ox = slug + bleed
    oy = slug + bleed
    for page in doc:
        media = page.mediabox
        page.set_trimbox(pymupdf.Rect(ox, oy, ox + trim_w, oy + trim_h))
        page.set_bleedbox(pymupdf.Rect(ox - bleed, oy - bleed, ox + trim_w + bleed, oy + trim_h + bleed))
        page.set_cropbox(media)
    tmp = path.with_suffix(".tmp.pdf")
    doc.save(tmp)
    doc.close()
    tmp.replace(path)


def write_png(pdf: Path, png: Path, page: int, dpi: int) -> tuple[int, int]:
    import pymupdf

    doc = pymupdf.open(pdf)
    target = doc[page]
    clip = target.trimbox if target.trimbox else None
    pix = target.get_pixmap(dpi=dpi, clip=clip, alpha=False)
    pix.save(png)
    doc.close()
    return pix.width, pix.height


def main() -> None:
    register_fonts()
    crops = load_crops()
    PUBLIC.mkdir(exist_ok=True)
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    portrait = (297 * MM, 420 * MM)
    a4 = (210 * MM, 297 * MM)
    a3_land = (420 * MM, 297 * MM)
    a4_land = (297 * MM, 210 * MM)

    print_pdf = ARTIFACTS / "robin-radish-sowing-calendar-2027-print.pdf"

    def calendar_pages(c, inset, trim_w, trim_h, bleed, slug):
        def page(draw):
            paint_page(c, inset, trim_w, trim_h, bleed, slug)
            draw(c, inset, inset, trim_w, trim_h)
            if bleed:
                crop_marks(c, inset, inset, trim_w, trim_h, bleed)
            c.showPage()

        page(draw_cover)
        for month in range(1, 13):
            page(lambda cv, x, y, w, h, m=month: draw_month(cv, x, y, w, h, m, crops))
        page(lambda cv, x, y, w, h: draw_overview(cv, x, y, w, h, crops))

    render_pdf(print_pdf, portrait, 3 * MM, calendar_pages)

    sample = PUBLIC / "sowing-calendar-2027-sample.pdf"

    def sample_pages(c, inset, trim_w, trim_h, bleed, slug):
        paint_page(c, inset, trim_w, trim_h, bleed, slug)
        draw_month(c, inset, inset, trim_w, trim_h, 3, crops)
        c.showPage()

    render_pdf(sample, a4, 0, sample_pages)

    chart_print = ARTIFACTS / "robin-radish-sowing-timeline-2027-a3.pdf"
    chart_screen = ARTIFACTS / "robin-radish-sowing-timeline-2027-a4.pdf"

    def chart_pages(c, inset, trim_w, trim_h, bleed, slug):
        paint_page(c, inset, trim_w, trim_h, bleed, slug)
        draw_wallchart(c, inset, inset, trim_w, trim_h, crops)
        if bleed:
            crop_marks(c, inset, inset, trim_w, trim_h, bleed)
        c.showPage()

    render_pdf(chart_print, a3_land, 3 * MM, chart_pages)
    render_pdf(chart_screen, a4_land, 0, chart_pages)

    write_png(print_pdf, ARTIFACTS / "robin-radish-sowing-calendar-2027-cover.png", 0, 110)
    write_png(print_pdf, ARTIFACTS / "robin-radish-sowing-calendar-2027-spread.png", 3, 110)
    write_png(print_pdf, ARTIFACTS / "robin-radish-sowing-calendar-2027-winter.png", 1, 110)
    write_png(print_pdf, ARTIFACTS / "robin-radish-sowing-calendar-2027-overview.png", 13, 110)
    write_png(chart_print, ARTIFACTS / "robin-radish-sowing-timeline-2027-a3.png", 0, 100)
    write_png(chart_screen, ARTIFACTS / "robin-radish-sowing-timeline-2027-a4.png", 0, 140)
    timeline_png = ARTIFACTS / "robin-radish-sowing-timeline-2027-a4.png"
    (PUBLIC / "sowing-calendar-2027-timeline.png").write_bytes(timeline_png.read_bytes())
    for name in (
        "sowing-calendar-2027-cover.png",
        "sowing-calendar-2027-spread.png",
        "sowing-calendar-2027-winter.png",
        "sowing-calendar-2027-overview.png",
    ):
        src = ARTIFACTS / f"robin-radish-{name}"
        (PUBLIC / name).write_bytes(src.read_bytes())
    (ARTIFACTS / "robin-radish-sowing-calendar-2027-sample.pdf").write_bytes(sample.read_bytes())
    for stale in (
        PUBLIC / "sowing-calendar-2027-a4.pdf",
        PUBLIC / "sowing-calendar-2027-a4.png",
    ):
        if stale.exists():
            stale.unlink()
    print("print", print_pdf)
    print("sample", sample)
    print("chart", chart_print)


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as error:
        sys.stderr.write(error.stderr or "")
        raise
