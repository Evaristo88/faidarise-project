import { c as createComponent, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_BWsXm4aU.mjs';
import 'kleur/colors';
import 'html-escaper';

const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "BetInsights - Login" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"> <div class="bg-gradient-to-r from-indigo-600 to-blue-500 py-6"> <div class="flex justify-center"> <div class="h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-md"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> </div> </div> <h2 class="mt-4 text-center text-3xl font-extrabold text-white">
Welcome Back
</h2> <p class="text-center text-indigo-100">
Sign in to access your sports odds dashboard
</p> </div> <div class="px-6 py-8"> <div id="error-message" class="mb-4 hidden bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
Invalid username or password. Please try again.
</div> <form id="login-form" class="space-y-6"> <div> <label for="username" class="block text-sm font-medium text-gray-700">
Username
</label> <div class="mt-1 relative rounded-md shadow-sm"> <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path> </svg> </div> <input type="text" id="username" name="username" required class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" placeholder="Username"> </div> </div> <div> <label for="password" class="block text-sm font-medium text-gray-700">
Password
</label> <div class="mt-1 relative rounded-md shadow-sm"> <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path> </svg> </div> <input type="password" id="password" name="password" required class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" placeholder="Password"> </div> </div> <div class="flex items-center justify-between"> <div class="flex items-center"> <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"> <label for="remember-me" class="ml-2 block text-sm text-gray-700">
Remember me
</label> </div> <div class="text-sm"> <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
Forgot password?
</a> </div> </div> <div> <button type="submit" id="login-button" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
Sign in
</button> </div> </form> <div class="mt-6"> <div class="relative"> <div class="absolute inset-0 flex items-center"> <div class="w-full border-t border-gray-300"></div> </div> <div class="relative flex justify-center text-sm"> <span class="px-2 bg-white text-gray-500">
Don't have an account?
</span> </div> </div> <div class="mt-6"> <a href="/register" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100">
Create new account
</a> </div> </div> </div> </div> </div> <div id="loading-overlay" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 hidden"> <div class="bg-white p-5 rounded-lg shadow-lg flex items-center"> <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> <span>Signing in...</span> </div> </div>  ` })}`;
}, "/home/rama-canon/faidarise-project/frontend/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
