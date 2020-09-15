function addVars() {
  BOOMR.addVar({
    "UserId": SOASTA.UserId,
    "ClientId": SOASTA.ClientId,
    "GroupId": SOASTA.GroupId,
    "UniqueId": SOASTA.UniqueId
  });
}

if (document.addEventListener) {
  document.addEventListener("onBoomerangLoaded", addVars);
}
else if (document.attachEvent) {
  document.attachEvent("onpropertychange", function(e) {
    if (!e) e = window.event;
    if (e && e.propertyName === "onBoomerangLoaded") {
      addVars();
    }
  });
}