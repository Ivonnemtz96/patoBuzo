!(function (e) {
  "use strict";
  let a = ".contact-form",
    s = "is-invalid",
    t = '[name="email"]',
    r = '[name="name"],[name="email"],[name="message"]',
    n = e(".form-messages");
  function o() {
    var o,
      l = e(a).serialize();
    (o = (function () {
      var n,
        o = !0;
      function l(t) {
        t = t.split(",");
        for (var r = 0; r < t.length; r++)
          (n = a + " " + t[r]),
            e(n).val()
              ? (e(n).removeClass(s), (o = !0))
              : (e(n).addClass(s), (o = !1));
      }
      l(r),
        e(t).val() &&
        e(t)
          .val()
          .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
          ? (e(t).removeClass(s), (o = !0))
          : (e(t).addClass(s), (o = !1));
      return o;
    })()),
      o &&
        jQuery
          .ajax({ url: e(a).attr("action"), data: l, type: "POST" })
          .done((s) => {
            n.removeClass("error"),
              n.addClass("success"),
              n.text(s),
              e(a + ' input:not([type="submit"]),' + a + " textarea").val("");
          })
          .fail((e) => {
            n.removeClass("success"),
              n.addClass("error"),
              "" !== e.responseText
                ? n.text(e.responseText)
                : n.text(
                    "Oops! An error occured and your message could not be sent."
                  );
          });
  }
  e(a).on("submit", (e) => {
    e.preventDefault(), o();
  });
})(jQuery);
