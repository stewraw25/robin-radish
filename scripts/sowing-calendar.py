#!/usr/bin/env python3
"""Build the 2027 sowing calendar from lib/crops.ts.

A4 is the free download. A3 is print-ready: 3mm bleed, crop marks, CMYK colours,
embedded fonts. Both are vector PDFs. PNG previews are rendered from those PDFs.
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.colors import CMYKColor, Color

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path(__file__).resolve().parent / "fonts"
PUBLIC = ROOT / "public"
ARTIFACTS = Path("/opt/cursor/artifacts")
SITE = "https://stewraw25.github.io/robin-radish/"

MM = 72 / 25.4

GROUPS = [
    ("Roots", ["carrots", "beetroot", "parsnips", "radishes", "early-potatoes", "maincrop-potatoes"]),
    ("Brassicas", ["kale", "summer-cabbage", "brussels-sprouts"]),
    ("Legumes", ["broad-beans", "peas", "french-beans", "runner-beans"]),
    ("Salads and leaves", ["lettuce", "spinach", "chard"]),
    ("Alliums", ["leeks", "onions", "onion-sets", "garlic", "spring-onions"]),
    ("Fruiting", ["tomatoes", "courgettes", "cucumbers", "sweetcorn"]),
    ("Herbs", ["parsley", "coriander", "basil", "chives", "mint", "rosemary", "thyme"]),
]

JOBS = [
    ("sowIndoors", "Sow under cover"),
    ("sowOutdoors", "Sow outdoors"),
    ("plant", "Plant out"),
    ("harvest", "Harvest"),
]

MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def cmyk(hex_color: str) -> CMYKColor:
    value = hex_color.lstrip("#")
    red, green, blue = (int(value[i : i + 2], 16) / 255 for i in (0, 2, 4))
    black = 1 - max(red, green, blue)
    if black >= 0.999:
        return CMYKColor(0, 0, 0, 1)
    scale = 1 - black
    return CMYKColor((1 - red - black) / scale, (1 - green - black) / scale, (1 - blue - black) / scale, black)


CREAM = cmyk("f4efe4")
INK = cmyk("1c2b22")
GREEN = cmyk("1f4d38")
LEAF = cmyk("3d8a62")
RADISH = cmyk("9a2e28")
GOLD = cmyk("b8862f")
SOIL = cmyk("7a5436")
RULE = cmyk("d9d0c2")
JOB_COLOR = {
    "sowIndoors": GREEN,
    "sowOutdoors": LEAF,
    "plant": RADISH,
    "harvest": GOLD,
}


def load_crops() -> dict:
    script = r"""
import { crops } from "./lib/crops.ts";
const data = crops.map((crop) => ({
  slug: crop.slug,
  name: crop.name,
  sowIndoors: crop.sowIndoors,
  sowOutdoors: crop.sowOutdoors,
  plant: crop.plant,
  harvest: crop.harvest,
}));
process.stdout.write(JSON.stringify(data));
"""
    result = subprocess.run(
        ["node", "--experimental-strip-types", "--input-type=module", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    crops = {crop["slug"]: crop for crop in json.loads(result.stdout)}
    seen = []
    for _label, slugs in GROUPS:
        seen.extend(slugs)
    if len(seen) != len(set(seen)) or set(seen) != set(crops):
        missing = sorted(set(crops) - set(seen))
        extra = sorted(set(seen) - set(crops))
        raise SystemExit(f"Calendar groups do not match crops. Missing {missing}. Extra {extra}.")
    return crops


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("CalendarSans", str(FONT_DIR / "source-sans-400.ttf")))
    pdfmetrics.registerFont(TTFont("CalendarSansBold", str(FONT_DIR / "source-sans-600.ttf")))
    pdfmetrics.registerFont(TTFont("CalendarDisplay", str(FONT_DIR / "fraunces-600.ttf")))


def draw_radish(c: canvas.Canvas, x: float, y: float, h: float) -> None:
    """Small radish in the same colours as the site mark. y is the baseline."""
    s = h / 18
    c.setFillColor(LEAF)
    path = c.beginPath()
    path.moveTo(x + 4 * s, y + 12 * s)
    path.curveTo(x + 1 * s, y + 16 * s, x + 3 * s, y + 18 * s, x + 6 * s, y + 13 * s)
    path.close()
    c.drawPath(path, fill=1, stroke=0)
    c.setFillColor(GREEN)
    path = c.beginPath()
    path.moveTo(x + 6 * s, y + 12 * s)
    path.curveTo(x + 8 * s, y + 17 * s, x + 11 * s, y + 18 * s, x + 9 * s, y + 12 * s)
    path.close()
    c.drawPath(path, fill=1, stroke=0)
    c.setFillColor(RADISH)
    path = c.beginPath()
    path.moveTo(x + 5 * s, y + 12 * s)
    path.curveTo(x + 9 * s, y + 10 * s, x + 11 * s, y + 4 * s, x + 7 * s, y + 1 * s)
    path.curveTo(x + 4 * s, y + 3 * s, x + 2 * s, y + 8 * s, x + 5 * s, y + 12 * s)
    path.close()
    c.drawPath(path, fill=1, stroke=0)
    c.setStrokeColor(SOIL)
    c.setLineWidth(0.6)
    c.line(x + 6.2 * s, y + 1 * s, x + 7 * s, y - 1.4 * s)


def draw_robin(c: canvas.Canvas, x: float, y: float, h: float) -> None:
    s = h / 16
    c.setStrokeColor(SOIL)
    c.setFillColor(SOIL)
    c.setLineWidth(0.8)
    c.line(x + 1 * s, y + 7 * s, x + 8 * s, y + 8.4 * s)
    c.setFillColor(CREAM)
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.7)
    c.ellipse(x + 4 * s, y + 4 * s, x + 12 * s, y + 11 * s, fill=1, stroke=1)
    c.setFillColor(RADISH)
    c.ellipse(x + 8 * s, y + 5 * s, x + 13 * s, y + 9.5 * s, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.circle(x + 6.2 * s, y + 9.2 * s, 2.1 * s, fill=1, stroke=1)
    c.setFillColor(INK)
    c.circle(x + 6.8 * s, y + 9.6 * s, 0.35 * s, fill=1, stroke=0)
    c.setFillColor(GOLD)
    path = c.beginPath()
    path.moveTo(x + 8 * s, y + 8.6 * s)
    path.lineTo(x + 11.2 * s, y + 8.2 * s)
    path.lineTo(x + 8.4 * s, y + 7.4 * s)
    path.close()
    c.drawPath(path, fill=1, stroke=0)


def bar(c: canvas.Canvas, x: float, y: float, w: float, h: float, color: Color, hollow: bool) -> None:
    inset = 0.4
    if hollow:
        c.setStrokeColor(color)
        c.setLineWidth(0.7)
        c.setFillColor(CREAM)
        c.roundRect(x + inset, y + inset, w - inset * 2, h - inset * 2, 0.8, fill=1, stroke=1)
    else:
        c.setFillColor(color)
        c.roundRect(x + inset, y + inset, w - inset * 2, h - inset * 2, 0.8, fill=1, stroke=0)


def draw_calendar(c: canvas.Canvas, ox: float, oy: float, width: float, height: float) -> None:
    crops = load_crops()
    c.setFillColor(CREAM)
    # Caller paints the bleed. This fills the trim.
    c.rect(ox, oy, width, height, fill=1, stroke=0)

    scale = width / (297 * MM)
    margin = 7 * MM * scale
    left = ox + margin
    right = ox + width - margin
    top = oy + height - margin
    title_size = 20 * scale
    c.setFillColor(GREEN)
    draw_robin(c, left, top - 18 * scale, 16 * scale)
    c.setFillColor(INK)
    c.setFont("CalendarDisplay", title_size)
    c.drawString(left + 20 * scale, top - 16 * scale, "UK Sowing Calendar 2027")
    c.setFillColor(GREEN)
    c.setFont("CalendarSans", 9 * scale)
    c.drawString(left + 20 * scale, top - 28 * scale, "Robin & Radish")
    draw_radish(c, right - 18 * scale, top - 22 * scale, 18 * scale)

    key_y = top - 44 * scale
    key_h = 8 * scale
    c.setFont("CalendarSans", 8 * scale)
    cursor = left
    for job, label in JOBS:
        c.setFillColor(JOB_COLOR[job])
        c.roundRect(cursor, key_y, 14 * scale, key_h, 1, fill=1, stroke=0)
        c.setFillColor(INK)
        c.drawString(cursor + 17 * scale, key_y + 1.4 * scale, label)
        cursor += c.stringWidth(label, "CalendarSans", 8 * scale) + 28 * scale
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.7)
    c.setFillColor(CREAM)
    c.roundRect(cursor, key_y, 14 * scale, key_h, 1, fill=1, stroke=1)
    c.setFillColor(INK)
    c.setFont("CalendarSans", 8 * scale)
    c.drawString(cursor + 17 * scale, key_y + 1.4 * scale, "North only, where the lists differ")

    footer_h = 22 * scale
    table_bottom = oy + margin + footer_h
    table_top = key_y - 16 * scale
    label_w = 40 * MM * scale
    grid_left = left + label_w
    grid_w = right - grid_left
    col_w = grid_w / 12

    rows = []
    for label, slugs in GROUPS:
        rows.append(("group", label, None))
        for slug in slugs:
            rows.append(("crop", crops[slug]["name"], crops[slug]))
    group_h = 11 * scale
    crop_h = 11 * scale
    used = len(GROUPS) * group_h + 32 * crop_h
    extra = table_top - table_bottom - used
    if extra > 0:
        group_h += extra * 0.2 / len(GROUPS)
        crop_h += extra * 0.8 / 32
    elif extra < 0:
        crop_h += extra / 32

    y = table_top
    c.setStrokeColor(RULE)
    c.setLineWidth(0.3)
    for kind, label, crop in rows:
        y -= group_h if kind == "group" else crop_h
        row_h = group_h if kind == "group" else crop_h
        if kind == "group":
            c.setFillColor(GREEN)
            c.rect(left, y, right - left, row_h, fill=1, stroke=0)
            c.setFillColor(CREAM)
            c.setFont("CalendarSansBold", 8 * scale)
            c.drawString(left + 2 * scale, y + row_h * 0.28, label.upper())
            continue
        c.setFillColor(INK)
        c.setFont("CalendarSans", 7.4 * scale)
        c.drawString(left + 1.5 * scale, y + row_h * 0.32, label)
        c.setStrokeColor(RULE)
        c.setLineWidth(0.25)
        for month in range(13):
            c.line(grid_left + month * col_w, y, grid_left + month * col_w, y + row_h)
        lane_h = row_h / 4
        for index, (job, _name) in enumerate(JOBS):
            south = set(crop[job]["south"])
            north = set(crop[job]["north"])
            lane_y = y + (3 - index) * lane_h
            for month in range(1, 13):
                cell_x = grid_left + (month - 1) * col_w
                if month in south:
                    bar(c, cell_x, lane_y, col_w, lane_h, JOB_COLOR[job], hollow=False)
                elif month in north:
                    bar(c, cell_x, lane_y, col_w, lane_h, JOB_COLOR[job], hollow=True)
        c.setStrokeColor(RULE)
        c.line(left, y, right, y)

    # Month headings sit in the gap above the first row if any, else over the grid top.
    head_y = table_top + 3 * scale
    c.setFillColor(SOIL)
    c.setFont("CalendarSansBold", 7 * scale)
    for index, name in enumerate(MONTHS):
        cell_x = grid_left + index * col_w
        c.drawCentredString(cell_x + col_w / 2, head_y, name)

    c.setFillColor(INK)
    c.setFont("CalendarSans", 7 * scale)
    footer_lines = [
        "Filled bars: southern England, the Midlands and much of Wales. Hollow bars: northern England and Scotland, only in months where that list differs.",
        "Frost and a cold spring move both. These are ranges, not a forecast.",
    ]
    c.drawString(left, oy + margin + 9 * scale, footer_lines[0])
    c.drawString(left, oy + margin, footer_lines[1])
    c.setFillColor(GREEN)
    c.setFont("CalendarSansBold", 8 * scale)
    c.drawRightString(right, oy + margin, SITE)


def crop_marks(c: canvas.Canvas, ox: float, oy: float, width: float, height: float, bleed: float) -> None:
    mark = 4 * MM
    gap = bleed + 1 * MM
    c.setStrokeColor(CMYKColor(0, 0, 0, 1))
    c.setLineWidth(0.4)
    corners = [
        (ox, oy, -1, -1),
        (ox + width, oy, 1, -1),
        (ox, oy + height, -1, 1),
        (ox + width, oy + height, 1, 1),
    ]
    for x, y, sx, sy in corners:
        c.line(x + sx * gap, y, x + sx * (gap + mark), y)
        c.line(x, y + sy * gap, x, y + sy * (gap + mark))


def write_pdf(path: Path, trim: tuple[float, float], bleed: float) -> None:
    trim_w, trim_h = trim
    slug = 6 * MM if bleed else 0
    inset = bleed + slug
    media = (trim_w + inset * 2, trim_h + inset * 2)
    c = canvas.Canvas(str(path), pagesize=media)
    c.setTitle("Robin & Radish UK Sowing Calendar 2027")
    c.setAuthor("Robin & Radish")
    c.setFillColor(CREAM)
    # Cream runs through the bleed. The slug outside the bleed stays white for the marks.
    c.rect(slug, slug, trim_w + bleed * 2, trim_h + bleed * 2, fill=1, stroke=0)
    draw_calendar(c, inset, inset, trim_w, trim_h)
    if bleed:
        crop_marks(c, inset, inset, trim_w, trim_h, bleed)
    c.showPage()
    c.save()
    if bleed:
        set_boxes(path, trim_w, trim_h, bleed, slug)


def set_boxes(path: Path, trim_w: float, trim_h: float, bleed: float, slug: float) -> None:
    import fitz

    doc = fitz.open(path)
    page = doc[0]
    media = page.mediabox
    # PDF user space, origin bottom-left. MuPDF Rect uses the same.
    ox = slug + bleed
    oy = slug + bleed
    page.set_mediabox(media)
    page.set_trimbox(fitz.Rect(ox, oy, ox + trim_w, oy + trim_h))
    page.set_bleedbox(fitz.Rect(ox - bleed, oy - bleed, ox + trim_w + bleed, oy + trim_h + bleed))
    page.set_cropbox(media)
    doc.save(path, incremental=True, encryption=fitz.PDF_ENCRYPT_KEEP)
    doc.close()


def write_png(pdf: Path, png: Path, dpi: int) -> None:
    import fitz

    doc = fitz.open(pdf)
    page = doc[0]
    pix = page.get_pixmap(dpi=dpi, alpha=False)
    pix.save(png)
    doc.close()


def main() -> None:
    register_fonts()
    PUBLIC.mkdir(exist_ok=True)
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    a4 = (297 * MM, 210 * MM)
    a3 = (420 * MM, 297 * MM)
    outputs = {
        "a4": PUBLIC / "sowing-calendar-2027-a4.pdf",
        "a4png": PUBLIC / "sowing-calendar-2027-a4.png",
    }
    write_pdf(outputs["a4"], a4, bleed=0)
    write_png(outputs["a4"], outputs["a4png"], dpi=140)
    a3_pdf = ARTIFACTS / "robin-radish-sowing-calendar-2027-a3.pdf"
    a3_png = ARTIFACTS / "robin-radish-sowing-calendar-2027-a3.png"
    write_pdf(a3_pdf, a3, bleed=3 * MM)
    write_png(a3_pdf, a3_png, dpi=120)
    for name in ("sowing-calendar-2027-a4.pdf", "sowing-calendar-2027-a4.png"):
        target = ARTIFACTS / f"robin-radish-{name}"
        target.write_bytes((PUBLIC / name).read_bytes())
    print(f"Wrote {outputs['a4']}")
    print(f"Wrote {outputs['a4png']}")
    print(f"Wrote {a3_pdf}")
    print(f"Wrote {a3_png}")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as error:
        sys.stderr.write(error.stderr or "")
        raise
