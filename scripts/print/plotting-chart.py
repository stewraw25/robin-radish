import json, os, random
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import Color, CMYKColor
from PIL import Image, ImageFilter
import numpy as np
W='/workspace/robin-radish/'; F=W+'work/fonts/'
for n,f in [('Fr','Fraunces-SemiBold.ttf'),('SS','SourceSans3-Regular.ttf'),('SSB','SourceSans3-Semibold.ttf'),('CG','CormorantGaramond-Regular.ttf'),('CGI','CormorantGaramond-Italic.ttf')]:
    pdfmetrics.registerFont(TTFont(n,F+f))
D=json.load(open(W+'work2/timeline.json'))
TW,TH=420*mm,297*mm; BL=3*mm; SL=8*mm
PW,PH=TW+2*SL,TH+2*SL
out=W+'print-ready/robin-radish-plotting-chart-2027-A3-print.pdf'
c=canvas.Canvas(out,pagesize=(PW,PH))
c.setTitle('Robin & Radish UK Sowing Plotting Chart 2027'); c.setAuthor('Robin & Radish')
c.setTrimBox((SL,SL,SL+TW,SL+TH)); c.setBleedBox((SL-BL,SL-BL,SL+TW+BL,SL+TH+BL))
# aged paper texture
tex=W+'work2/paper-A3L-300.jpg'
if not os.path.exists(tex):
    w,h=5032,3579; rng=np.random.default_rng(7)
    base=np.array([244,239,227],float)[None,None,:]*np.ones((h,w,1))
    n=Image.fromarray((rng.normal(0,1,(h//16,w//16))*255/4+128).clip(0,255).astype('uint8')).resize((w,h),Image.BICUBIC).filter(ImageFilter.GaussianBlur(49))
    n=(np.asarray(n,float)-128)/128
    fine=rng.normal(0,1,(h,w))*2.2
    img=base+ (n*7+fine)[...,None]*np.array([1,1,1.3])[None,None,:]*-1
    # foxing spots
    yy,xx=np.mgrid[0:h,0:w]
    for _ in range(45):
        cx,cy,r=rng.integers(0,w),rng.integers(0,h),rng.integers(6,31)
        m=np.exp(-(((xx-cx)**2+(yy-cy)**2)/(2*r*r)))
        img-= m[...,None]*np.array([18,30,45])[None,None,:]*rng.uniform(.3,1)
    # vignette darkening at edges
    v=((xx/w-.5)**2+(yy/h-.5)**2); img-= (v*28)[...,None]*np.array([.6,.9,1.4])[None,None,:]
    Image.fromarray(img.clip(0,255).astype('uint8')).save(tex,quality=90)
c.drawImage(tex,SL-BL,SL-BL,TW+2*BL,TH+2*BL)
INK=Color(.29,.22,.16); INK2=Color(.47,.37,.27); TEAL=Color(.094,.341,.341)
COL={'cover':Color(0.096,0.341,0.342),'outside':Color(0.162,0.449,0.416),'plant':Color(0.633,0.286,0.184),'harvest':Color(0.787,0.571,0.249)}
LAB={'cover':'Sow under cover','outside':'Sow outside','plant':'Plant out','harvest':'Harvest'}
X0=SL; Y0=SL
def T(x,y): return X0+x*mm, Y0+(297-y)*mm   # mm from top-left of trim
# double ruled border
c.setStrokeColor(INK2)
c.setLineWidth(1.0); c.rect(*T(8,289),404*mm,281*mm)
c.setLineWidth(0.35); c.rect(*T(9.6,287.4),400.8*mm,277.8*mm)
# header
c.setFillColor(INK2); c.setFont('SSB',7.5); c.drawString(*T(16,20),'ROBIN & RADISH   ·   A HOME GARDEN RECORD')
c.setFillColor(INK); c.setFont('Fr',24); c.drawString(*T(16,31),'UK sowing plotting chart')
tw=pdfmetrics.stringWidth('UK sowing plotting chart ','Fr',24)
c.setFillColor(Color(.63,.2,.16)); c.drawString(T(16,31)[0]+tw,T(16,31)[1],'2027')
c.setFillColor(INK2); c.setFont('SS',7.6)
c.drawString(*T(16,37),'Each band fills the whole month. Filled bands are the south list. An outline is a month on the north list when the south list does not include it.')
# key (top right)
kx=286; ky=19
c.setFont('SS',8)
for i,k in enumerate(['cover','outside','plant','harvest']):
    x=kx+(i%2)*55; y=ky+(i//2)*6.5
    c.setFillColor(COL[k]); c.roundRect(*T(x,y+0.6),9*mm,2.6*mm,1.3*mm,stroke=0,fill=1)
    c.setFillColor(INK); c.drawString(*T(x+11,y+0.2),LAB[k])
c.setStrokeColor(INK2); c.setLineWidth(0.6); c.roundRect(*T(kx,ky+13.6),9*mm,2.6*mm,1.3*mm,stroke=1,fill=0)
c.setFillColor(INK); c.drawString(*T(kx+11,ky+13.2),'Outline: north list only')
# grid geometry
LX=16; LW=44; MX=LX+LW; MW=24.2; NX=MX+12*MW+2; NW=404+8-NX-8
VT=44   # vignette top
VH=MW*0.75-1.2
months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
stems=['01-january','02-february','03-march','04-april','05-may','06-june','07-july','08-august','09-september','10-october','11-november','12-december']
def thumb(stem):
    o=W+'work/thumb-'+stem+'.jpg'
    if not os.path.exists(o):
        im=Image.open(W+'plates/'+stem+'-original.jpg').convert('RGB')
        im.thumbnail((700,525),Image.LANCZOS); im.save(o,quality=90)
    return o
for i,s in enumerate(stems):
    x=MX+i*MW+0.6
    c.drawImage(thumb(s),*T(x,VT+VH),(MW-1.2)*mm,VH*mm)
HY=VT+VH+5.2
c.setFont('Fr',9.5); c.setFillColor(INK)
for i,m in enumerate(months): c.drawCentredString(*T(MX+i*MW+MW/2,HY),m)
c.setFont('SSB',8); c.setFillColor(INK2); c.drawString(*T(NX+2,HY),'Notes, varieties, dates sown')
RY=HY+2.2; BOT=274
order=D['order']
n=len(order); RH=(BOT-RY)/n
# month column shading and lines
for i in range(12):
    if i%2==0:
        c.setFillColor(Color(.47,.37,.27,alpha=.06)); c.rect(*T(MX+i*MW,BOT),MW*mm,(BOT-RY)*mm,stroke=0,fill=1)
c.setStrokeColor(Color(.47,.37,.27,alpha=.45)); c.setLineWidth(0.3)
for i in range(13): c.line(*T(MX+i*MW,RY),*T(MX+i*MW,BOT))
y=RY
lanes=['cover','outside','plant','harvest']
for name in order:
    if name.isupper():
        c.setFillColor(TEAL); c.rect(*T(LX,y+RH-0.4),(NX+NW-LX)*mm,(RH-0.8)*mm,stroke=0,fill=1)
        c.setFillColor(Color(.96,.94,.89)); c.setFont('SSB',7.4); c.drawString(*T(LX+2,y+RH-1.75),name)
    else:
        c.setFillColor(INK); c.setFont('SS',8.4); c.drawString(*T(LX+2,y+RH-1.6),name)
        d=D['data'][name]
        lh=(RH-0.9)/4
        for li,k in enumerate(lanes):
            ms=sorted(d[k])
            # merge consecutive months of same kind
            runs=[]
            for m,t in ms:
                if runs and runs[-1][1]==m-1 and runs[-1][2]==t: runs[-1][1]=m
                else: runs.append([m,m,t])
            for a,b,t in runs:
                x=MX+(a-1)*MW+0.7; w=(b-a+1)*MW-1.4; yy=y+0.45+li*lh+lh-0.1
                if t=='S':
                    c.setFillColor(COL[k]); c.roundRect(*T(x,yy),w*mm,(lh-0.18)*mm,(lh-0.18)*mm/2,stroke=0,fill=1)
                else:
                    c.setStrokeColor(COL[k]); c.setLineWidth(0.6); c.roundRect(*T(x,yy-0.1),w*mm,(lh-0.5)*mm,(lh-0.5)*mm/2,stroke=1,fill=0)
        # row rule + notes line
        c.setStrokeColor(Color(.47,.37,.27,alpha=.35)); c.setLineWidth(0.25)
        c.line(*T(LX,y+RH),*T(NX+NW,y+RH))
    y+=RH
c.setStrokeColor(INK2); c.setLineWidth(0.5); c.line(*T(NX,RY),*T(NX,BOT))
# footer
c.setFont('SS',6.8); c.setFillColor(INK2)
c.drawString(*T(16,279),'South: southern England, the Midlands and much of Wales. North: northern England and Scotland. Ranges, not a forecast.')
c.setFont('SSB',6.8); c.setFillColor(Color(.094,.341,.341)); c.drawRightString(*T(404,279),'robinandradish.co.uk')
c.setFont('CGI',8); c.setFillColor(INK2)
c.drawCentredString(*T(MX+6*MW,283.3),'Plates I to XII, January to December: leek, broad bean, carrot, pea, lettuce, courgette, tomato, runner bean, beetroot, pumpkin, parsnip, Brussels sprouts and kale.')
# crop marks
c.setStrokeColor(CMYKColor(1,1,1,1)); c.setLineWidth(0.25)
for x,y in [(SL,SL),(SL+TW,SL),(SL,SL+TH),(SL+TW,SL+TH)]:
    dx=-1 if x==SL else 1; dy=-1 if y==SL else 1
    c.line(x+dx*BL,y,x+dx*SL,y); c.line(x,y+dy*BL,x,y+dy*SL)
c.showPage(); c.save(); print(out, 'rows',n,'RH %.2f'%RH)
import pymupdf as fz, re
d=fz.open(out); pg=d[0]
for x in pg.get_contents():
    st=d.xref_stream(x)
    if b'BT /F1 12 Tf 14.4 TL ET' in st: d.update_stream(x,st.replace(b'BT /F1 12 Tf 14.4 TL ET',b''))
t2,v2=d.xref_get_key(pg.xref,'Resources/Font')
if t2=='xref':
    xr=int(v2.split()[0]); d.update_object(xr,re.sub(r'/F1 \d+ 0 R','',d.xref_object(xr)))
else: d.xref_set_key(pg.xref,'Resources/Font',re.sub(r'/F1 \d+ 0 R','',v2))
d.save(out+'.tmp',garbage=4,deflate=True); d.close(); os.replace(out+'.tmp',out)
fz.open(out)[0].get_pixmap(dpi=110,clip=fz.open(out)[0].trimbox).save(W+'work2/previews/preview-plotting-chart-A3.png')
