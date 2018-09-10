using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SLB_REST.Context;
using SLB_REST.Models;
using SLB_REST.ViewModel;


namespace SLB_REST.Controllers
{
    
    public class AccountController : Controller
    {
        protected UserManager<UserModel> UserManager { get; }
        protected SignInManager<UserModel> SignInManager { get; }
        protected RoleManager<IdentityRole<int>> RoleManager { get; }

        public AccountController(UserManager<UserModel> userManager, SignInManager<UserModel> signInManager, RoleManager<IdentityRole<int>> roleManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            RoleManager = roleManager;
        }


        [HttpGet]
        public IActionResult Register()
        {
            if (!User.Identity.IsAuthenticated)
            {

                return View();
            }
            else
            {
                return RedirectToAction("Albums", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel viewModel)
        {

            if (!User.Identity.IsAuthenticated)
            {
                if (ModelState.IsValid)
                {
                    var user = new UserModel(viewModel.Login) { Email = viewModel.Email };
                    var result = await UserManager.CreateAsync(user, viewModel.Password);

                    if (result.Succeeded)
                    {
                        await SignInManager.PasswordSignInAsync(viewModel.Login,
                                viewModel.Password, true, false);

                        return RedirectToAction("Albums", "Home");

                    }

                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }

                return View(viewModel);
            }

            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public IActionResult Login()
        {
            if (!User.Identity.IsAuthenticated)
            {

                return View();
            }
            else
            {
                return RedirectToAction("Albums", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var result = await SignInManager.PasswordSignInAsync(viewModel.Login,
                    viewModel.Password, viewModel.RememberMe, false);
                if (result.Succeeded)
                {
                    return RedirectToAction("Albums", "Home");
                }
                else
                {

                    return View(viewModel);
                }
            }
            return View(viewModel);
        }

        [HttpGet]
        public async Task<IActionResult> LogOut()
        {
            await SignInManager.SignOutAsync();
            return RedirectToAction("Login", "Account");
        }
    }
}
