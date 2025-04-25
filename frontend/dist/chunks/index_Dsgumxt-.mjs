/* empty css                             */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './astro/server_BWsXm4aU.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from './MainLayout_DZHVDUJL.mjs';
import { L as LoginForm } from './LoginForm_CwT7sjLE.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/rama-canon/faidarise-project/frontend/src/components/LoginForm", "client:component-export": "default" })} </main> ` })}`;
}, "/home/rama-canon/faidarise-project/frontend/src/pages/index.astro", void 0);

const $$file = "/home/rama-canon/faidarise-project/frontend/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
