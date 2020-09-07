import { html, useState, createContext } from '../vendor/preact.js';

import Inspector from './Inspector.js';
import Graph from './Graph.js';

export const AppContext = createContext(null);

function Splitter({ onClick }) {
  const [isOpen, setOpen] = useState(true);

  function handleClick() {
    setOpen(!isOpen);
    onClick(!isOpen);
  }

  return html`
    <div id="splitter" onClick=${handleClick}>${isOpen ? '\u{25b6}' : '\u{25c0}'}</div>
  `;
}

export default function App() {
  const [inspectorOpen, setInspectorOpen] = useState(true);

  // Parse url query param, "q"
  const q = /q=([^&]+)/.test(location.search) && RegExp.$1;
  const query = q ? decodeURIComponent(q).split(/\s*,\s*/) : [];

  const context = {
    pane: useState('info'),
    query: useState(query),
    inspectModule: useState([]),
    inspectGraph: useState([]),
    depIncludes: useState(['dependencies'])
  };

  return html`
    <${AppContext.Provider} value=${context}>
      <${Graph} />      
      <${Splitter} onClick=${setInspectorOpen} />
      <${Inspector} className=${inspectorOpen ? 'open' : ''} />
    </${AppContext.Provider}>`;
}