import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Get bounding boxes of #about, #experience, and all section dividers
  const boxes = await page.evaluate(() => {
    const about = document.querySelector('#about').getBoundingClientRect();
    const experience = document.querySelector('#experience').getBoundingClientRect();
    
    // find elements between about and experience
    const aboutEl = document.querySelector('#about');
    let next = aboutEl.nextElementSibling;
    const elementsBetween = [];
    while (next && next.id !== 'experience') {
      elementsBetween.push({
        tag: next.tagName,
        className: next.className,
        rect: next.getBoundingClientRect()
      });
      next = next.nextElementSibling;
    }

    return {
      about: { top: about.top, bottom: about.bottom, height: about.height },
      experience: { top: experience.top, bottom: experience.bottom, height: experience.height },
      elementsBetween
    };
  });

  console.log(JSON.stringify(boxes, null, 2));
  await browser.close();
})();
