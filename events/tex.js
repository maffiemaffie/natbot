const { Events, AttachmentBuilder } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(msg) {
    if (msg.content.includes('```latex\n'));
    const blocks = msg.content.split("```latex\n").slice(1);
    const latexes = blocks.map(b => b.split(/\s*```/)[0]);
    const files = await Promise.all(latexes.map(l => loadMathJax(`\\begin{align*}${l}\\end{align*}`)));
    if (files.length) msg.reply({ files: [...files] });
	}
};

const sharp = require('sharp');
const loadMathJax = async(tex) => {
  const MathJax = await require('mathjax').init({
    loader: {load: ['input/tex', 'output/svg']}
  });
  
  const CSS = 'svg { font-size:xx-large; }'
  
  const svg = await MathJax.tex2svg(tex, {display: true});
  const svgImage = MathJax.startup.adaptor.innerHTML(svg);
  const svgImageWithCSS = svgImage.replace(`<defs>`, `<defs><style>${CSS}</style>`);
  console.log(svgImageWithCSS);
  const svgBuffer = await Buffer.from(svgImageWithCSS);

  // Convert any input to full color PNG output
  const data = await sharp(svgBuffer)
    .png()
    // .resize({ width: 550 })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .toBuffer();
  
  return data;
}