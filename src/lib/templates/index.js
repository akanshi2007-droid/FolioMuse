import noir from './noir.js';
import volt from './volt.js';
import paper from './paper.js';
import terminal from './terminal.js';
import pop from './pop.js';

export const TEMPLATES = { noir, volt, paper, terminal, pop };
export const TEMPLATE_LIST = [noir, volt, paper, terminal, pop];
export const getTemplate = (id) => TEMPLATES[id] || noir;
