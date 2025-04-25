/* empty css                             */
import { c as createComponent, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_BWsXm4aU.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from './MainLayout_DZHVDUJL.mjs';

const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Dashboard" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Dashboard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/rama-canon/faidarise-project/frontend/src/components/Dashboard", "client:component-export": "default" })} </main> ` })}`;
}, "/home/rama-canon/faidarise-project/frontend/src/pages/dashboard.astro", void 0);

const $$file = "/home/rama-canon/faidarise-project/frontend/src/pages/dashboard.astro";
const $$url = "/dashboard";

export { $$Dashboard as default, $$file as file, $$url as url };
