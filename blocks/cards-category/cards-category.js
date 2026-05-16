import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const link = row.querySelector('a');
    const href = link ? link.href : null;
    const picture = row.querySelector('picture');
    const title = link ? link.textContent : '';

    const a = document.createElement('a');
    if (href) a.href = href;

    if (picture) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'cards-category-card-image';
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '120' }]);
        imageDiv.append(optimizedPic);
      }
      a.append(imageDiv);
    }

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'cards-category-card-body';
    const h3 = document.createElement('h3');
    h3.textContent = title;
    bodyDiv.append(h3);
    a.append(bodyDiv);

    li.append(a);
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
