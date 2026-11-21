import pymupdf as fz, os, sys
W='/workspace/robin-radish/'
P=W+'plates/'
BG=(0.9566643834114075, 0.9357595443725586, 0.8922865390777588)
INK=(0x4a/255,0x39/255,0x28/255); INK2=(0x78/255,0x5f/255,0x44/255)
REG=W+'work/fonts/CormorantGaramond-Regular.ttf'; ITA=W+'work/fonts/CormorantGaramond-Italic.ttf'
fr=fz.Font(fontfile=REG); fi=fz.Font(fontfile=ITA)
def img(stem):
    for suf in ['-print-3x.png','-print-4x.png','-original.jpg']:
        if os.path.exists(P+stem+suf): return P+stem+suf
plates=[('00-cover-portrait','Frontispiece','Radish and robin','Raphanus sativus','Erithacus rubecula'),
('01-january','Plate I','Leek and robin','Allium porrum','Erithacus rubecula'),
('02-february','Plate II','Broad bean and blue tit','Vicia faba','Cyanistes caeruleus'),
('03-march','Plate III','Carrot and robin','Daucus carota','Erithacus rubecula'),
('04-april','Plate IV','Pea and blackbird','Pisum sativum','Turdus merula'),
('05-may','Plate V','Lettuce and goldfinch','Lactuca sativa','Carduelis carduelis'),
('06-june','Plate VI','Courgette and song thrush','Cucurbita pepo','Turdus philomelos'),
('07-july','Plate VII','Tomato and house sparrow','Solanum lycopersicum','Passer domesticus'),
('08-august','Plate VIII','Runner bean and greenfinch','Phaseolus coccineus','Chloris chloris'),
('09-september','Plate IX','Beetroot and starling','Beta vulgaris','Sturnus vulgaris'),
('10-october','Plate X','Pumpkin and wren','Cucurbita maxima','Troglodytes troglodytes'),
('11-november','Plate XI','Parsnip and long-tailed tit','Pastinaca sativa','Aegithalos caudatus'),
('12-december','Plate XII','Brussels sprouts, kale and robin','Brassica oleracea','Erithacus rubecula')]
def caption(page, cx, y, plate, name, lat1, lat2, size=10.5):
    parts=[(plate+'  ·  '+name+'  ·  ',fr,REG,INK),(lat1+', '+lat2,fi,ITA,INK2)]
    total=sum(f.text_length(t,fontsize=size) for t,f,_,_ in parts)
    x=cx-total/2
    for t,f,ff,col in parts:
        nm='CGR' if f is fr else 'CGI'
        page.insert_font(fontname=nm,fontfile=ff)
        page.insert_text((x,y),t,fontname=nm,fontsize=size,color=col)
        x+=f.text_length(t,fontsize=size)
    # small hairline rule above caption
    page.draw_line((cx-40,y-size*1.6),(cx+40,y-size*1.6),color=INK2,width=0.4)
d=fz.open(W+'work2/old.pdf')
PW=d[0].rect.width; cx=PW/2
# cover intro without crop count
SSR=W+'work/fonts/SourceSans3-Regular.ttf'; fss=fz.Font(fontfile=SSR)
c0=d[0]; c0.add_redact_annot(fz.Rect(60,158,830,190),fill=None)
c0.apply_redactions(images=fz.PDF_REDACT_IMAGE_NONE, graphics=fz.PDF_REDACT_LINE_ART_NONE, text=fz.PDF_REDACT_TEXT_REMOVE)
intro="Twelve months for a home garden, with the south and north ranges from this site. The plates are drawings made for the calendar. They are not photographs, and they are not a picture of one garden."
lines=[];cur=''
for wd in intro.split():
    t=(cur+' '+wd).strip()
    if fss.text_length(t,fontsize=10)>762: lines.append(cur); cur=wd
    else: cur=t
lines.append(cur)
c0.insert_font(fontname='SSR',fontfile=SSR)
for k,ln in enumerate(lines): c0.insert_text((62.362,170.08+13*k),ln,fontname='SSR',fontsize=10,color=(0x78/255,0x5f/255,0x44/255))
for i in range(13):
    pg=d[i]; stem,pl,nm,l1,l2=plates[i]
    if i==0:
        area=fz.Rect(55,211,833,1153); top=222; bottom=1098
    else:
        area=fz.Rect(33,33,855,557); top=66; bottom=512  # plate top ~12mm below trim, clear of wire holes
    pg.add_redact_annot(area,fill=None)  # no RGB patch over the CMYK paper colour
    pg.apply_redactions(images=fz.PDF_REDACT_IMAGE_NONE, graphics=fz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED, text=fz.PDF_REDACT_TEXT_REMOVE)
    path=img(stem); pix=fz.Pixmap(path); ar=pix.width/pix.height
    if path.endswith('.png'):
        from PIL import Image
        jp=W+'work/embed-'+stem+'.jpg'
        if not os.path.exists(jp) or os.path.getmtime(jp)<os.path.getmtime(path):
            Image.open(path).convert('RGB').save(jp,quality=93,subsampling=0)
        path=jp
    h=bottom-top; w=h*ar
    r=fz.Rect(cx-w/2,top,cx+w/2,bottom)
    # faint shadow for a tipped-in plate feel
    pg.draw_rect(r+(1.2,1.2,1.2,1.2),color=None,fill=(0.80,0.76,0.68),fill_opacity=0.35,overlay=True)
    pg.insert_image(r,filename=path)
    caption(pg,cx,bottom+30 if i==0 else bottom+30,pl,nm,l1,l2,size=12 if i==0 else 10.5)
    print(i,stem,os.path.basename(path),'dpi~%.0f'%(pix.width/(w/72)))
# drop unused Helvetica F1 resource references
for pg in d:
    t,v=d.xref_get_key(pg.xref,'Resources/Font/F1')
    if t!='null':
        for cx_ in pg.get_contents():
            st=d.xref_stream(cx_)
            if b'/F1 ' in st:
                st=st.replace(b'BT /F1 12 Tf 14.4 TL ET',b'')
                assert b'/F1 ' not in st
                d.update_stream(cx_,st)
        import re as _re
        t2,v2=d.xref_get_key(pg.xref,'Resources/Font')
        nv=_re.sub(r'/F1 \d+ 0 R','',v2)
        if t2=='xref': d.update_object(int(v2.split()[0]), _re.sub(r'/F1 \d+ 0 R','',d.xref_object(int(v2.split()[0]))))
        else: d.xref_set_key(pg.xref,'Resources/Font',nv)
d.subset_fonts()
out=W+'print-ready/robin-radish-sowing-calendar-2027-A3-print.pdf'
d.set_metadata({'title':'Robin & Radish UK Sowing Calendar 2027','author':'Robin & Radish','subject':'UK sowing calendar 2027, A3 print with 3mm bleed and crop marks','creator':'Robin & Radish'})
d.save(out,garbage=4,deflate=True)
print('saved',out)

# A4 free sample of March: trim area of A3 page scaled to A4 (no bleed, for home printing)
a4=fz.open(); A4=fz.paper_rect('a4')
src=fz.open(out); tb=src[3].trimbox
p=a4.new_page(width=A4.width,height=A4.height)
p.show_pdf_page(p.rect,src,3,clip=tb)
a4.set_metadata({'title':'Robin & Radish UK Sowing Calendar 2027 - March (free A4 sample)','author':'Robin & Radish'})
a4.save(W+'print-ready/robin-radish-sowing-calendar-2027-march-A4-sample.pdf',garbage=4,deflate=True)
os.makedirs(W+'work2/previews',exist_ok=True)
for i,nm in [(0,'cover'),(3,'march'),(5,'may'),(11,'november'),(12,'december')]:
    src[i].get_pixmap(dpi=110,clip=src[i].trimbox).save(W+'calendar/previews/preview-%s.png'%nm)
print('done')
