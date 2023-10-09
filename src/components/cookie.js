export const cookie = {
    set: function (cname, cvalue, cdays = null) {
      var expires = "";
      if (cdays != null) {
          var date = new Date();
          date.setTime(date.getTime() + (cdays*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = cname + "=" + (cvalue || "")  + expires + "; path=/";
    },
  
    get: function (cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  
  }