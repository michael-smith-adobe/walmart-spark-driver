export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const link = row.querySelector('a');
    const href = link ? link.href : null;
    const title = row.querySelector('h3, h2, h4, strong');
    const desc = row.querySelector('p:not(:has(a)):not(:has(strong))') || row.querySelector('p + p');

    const a = document.createElement('a');
    if (href) a.href = href;

    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent;
      a.append(h3);
    }

    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent;
      a.append(p);
    }

    li.append(a);
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
