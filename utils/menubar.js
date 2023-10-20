
const updateMenubar = (req) => {

  var menubar = {};

  menubar.homeActive = true;

  if (req.session.loggedIn == true) {
    menubar.loginLinkURL = '/logout';
    menubar.loginLinkText = 'Logout';
  } else {
    menubar.loginLinkURL = '/login';
    menubar.loginLinkText = 'Login';
  }

  menubar.homeActive = false;
  menubar.dashboardActive = false;
  menubar.loginActive = false;

  switch(req.baseUrl){
    case '':
      menubar.homeActive = true;
      break;
    case '/dashboard':
      menubar.dashboardActive = true;
      break;
    case '/login':
      menubar.loginActive = true;
  }

  return menubar;

}

exports.updateMenubar = updateMenubar;