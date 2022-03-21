const w = 1000;
const h = 850;

const svg = d3.select('svg').attr('width', w).attr('height', h);

const tooltip = document.getElementById('tooltip');

const drawTreeMap = data => {
  const colors = [
    'blue',
    'pink',
    'rgb(156, 0, 0)',
    'green',
    'rgb(40, 44, 49)',
    'rgb(89, 204, 99)',
    'rgb(89, 171, 204)',
    'rgb(123, 89, 204)',
    'rgb(204, 89, 185)',
    'rgb(65, 9, 12)',
    'rgb(65, 59, 9)',
    'rgb(101, 175, 87)',
    'gray',
    'lightsteelblue',
    'rgb(195, 214, 192)',
    'rgb(64, 100, 114)',
    'rgb(17, 45, 97)',
    'rgb(56, 20, 56)'
  ];

  const categories = data.children.map(d => d.name);
  const colorScale = d3.scaleOrdinal().domain(categories).range(colors);

  const hierarchy = d3
    .hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  const treemap = d3.treemap().size([w, 650]).padding(2);

  const root = treemap(hierarchy);

  svg
    .selectAll('rect')
    .data(root.leaves())
    .enter()
    .append('rect')
    .attr('class', 'rectangle')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', d => colorScale(d.data.category))
    .attr('data-name', d => d.data.name)
    .attr('data-category', d => d.data.category)
    .attr('data-value', d => d.data.value);
};

fetch(
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
)
  .then(res => res.json())
  .then(data => {
    drawTreeMap(data);

    const rectangles = document.getElementsByClassName('rectangle');

    for (let i = 0; i < rectangles.length; i++) {
      let x = +rectangles[i].getAttribute('x') + 2;
      let y = +rectangles[i].getAttribute('y') + 4;
      const name = rectangles[i].getAttribute('data-name');
      const category = rectangles[i].getAttribute('data-category');
      const value = rectangles[i].getAttribute('data-value');

      svg
        .append('foreignObject')
        .attr('class', 'desc')
        .attr('data-name', name)
        .attr('data-category', category)
        .attr('data-value', value)
        .attr('x', x)
        .attr('y', y)
        .attr('width', 40)
        .attr('height', 29)
        .text(name)
        .style('font-size', '0.4rem')
        .style('color', 'white');

      rectangles[i].addEventListener('mouseover', e => {
        const name = e.target.getAttribute('data-name');
        const category = e.target.getAttribute('data-category');
        const value = e.target.getAttribute('data-value');

        tooltip.innerHTML = `<p>Name:${name}</p><p>Category: ${category}</p><p>Value: ${value}</p>`;
        tooltip.style.opacity = 1;
        tooltip.style.top = e.y + 'px';
        tooltip.style.left = `${
          e.x < 700 ? e.x + 10 + 'px' : e.x - 250 + 'px'
        }`;
      });

      rectangles[i].addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
        tooltip.style.top = 0;
        tooltip.style.left = 0;
      });
    }

    const descs = document.getElementsByClassName('desc');

    for (let i = 0; i < descs.length; i++) {
      descs[i].addEventListener('mouseover', e => {
        const name = e.target.getAttribute('data-name');
        const category = e.target.getAttribute('data-category');
        const value = e.target.getAttribute('data-value');

        tooltip.innerHTML = `<p>Name:${name}</p><p>Category: ${category}</p><p>Value: ${value}</p>`;
        tooltip.style.opacity = 1;
        tooltip.style.top = e.y + 'px';
        tooltip.style.left = `${
          e.x < 700 ? e.x + 10 + 'px' : e.x - 250 + 'px'
        }`;
      });

      descs[i].addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
        tooltip.style.top = 0;
        tooltip.style.left = 0;
      });
    }
    svg
      .append('rect')
      .attr('fill', 'blue')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 350)
      .attr('y', 680);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 370)
      .attr('y', 695)
      .text('2600');
    svg
      .append('rect')
      .attr('fill', 'pink')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 350)
      .attr('y', 710);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 370)
      .attr('y', 725)
      .text('Wii');

    svg
      .append('rect')
      .attr('fill', 'rgb(156, 0, 0)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 350)
      .attr('y', 740);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 370)
      .attr('y', 755)
      .text('NES');

    svg
      .append('rect')
      .attr('fill', 'green')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 350)
      .attr('y', 770);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 370)
      .attr('y', 785)
      .text('GB');

    svg
      .append('rect')
      .attr('fill', 'rgb(40, 44, 49)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 350)
      .attr('y', 800);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 370)
      .attr('y', 815)
      .text('DS');

    svg
      .append('rect')
      .attr('fill', 'rgb(89, 204, 99)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 350)
      .attr('y', 830);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 370)
      .attr('y', 845)
      .text('X360');

    svg
      .append('rect')
      .attr('fill', 'rgb(89, 171, 204)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 500)
      .attr('y', 680);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 520)
      .attr('y', 695)
      .text('PS3');

    svg
      .append('rect')
      .attr('fill', 'rgb(123, 89, 204)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 500)
      .attr('y', 710);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 520)
      .attr('y', 725)
      .text('PS2');

    svg
      .append('rect')
      .attr('fill', 'rgb(204, 89, 185)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 500)
      .attr('y', 740);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 520)
      .attr('y', 755)
      .text('SNES');

    svg
      .append('rect')
      .attr('fill', 'rgb(65, 9, 12)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 500)
      .attr('y', 770);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 520)
      .attr('y', 785)
      .text('GBA');

    svg
      .append('rect')
      .attr('fill', 'rgb(65, 59, 9)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 500)
      .attr('y', 800);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 520)
      .attr('y', 815)
      .text('PS4');

    svg
      .append('rect')
      .attr('fill', 'rgb(101, 175, 87)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 500)
      .attr('y', 830);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 520)
      .attr('y', 845)
      .text('3DS');

    svg
      .append('rect')
      .attr('fill', 'gray')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 650)
      .attr('y', 680);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 670)
      .attr('y', 695)
      .text('N64');

    svg
      .append('rect')
      .attr('fill', 'lightsteelblue')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 650)
      .attr('y', 710);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 670)
      .attr('y', 725)
      .text('PS');

    svg
      .append('rect')
      .attr('fill', 'rgb(195, 214, 192)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 650)
      .attr('y', 740);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 670)
      .attr('y', 755)
      .text('XB');

    svg
      .append('rect')
      .attr('fill', 'rgb(64, 100, 114)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 650)
      .attr('y', 770);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 670)
      .attr('y', 785)
      .text('PC');

    svg
      .append('rect')
      .attr('fill', 'rgb(17, 45, 97)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 650)
      .attr('y', 800);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 670)
      .attr('y', 815)
      .text('PSP');

    svg
      .append('rect')
      .attr('fill', 'rgb(56, 20, 56)')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 650)
      .attr('y', 830);
    svg
      .append('text')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 670)
      .attr('y', 845)
      .text('XOne');
  });
