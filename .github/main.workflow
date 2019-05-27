workflow "Build and Deploy Blog" {
  resolves = ["Notify Me"]
  on = "push"
}

action "Install packages" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Build & Deploy Blog" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install packages"]
  args = "run deploy"
}

action "Notify Me" {
  uses = "swinton/httpie.action@8ab0a0e926d091e0444fcacd5eb679d2e2d4ab3d"
  needs = ["Build & Deploy Blog"]
  secrets = ["USER", "PASS"]
  args = "[\"GET\", \"https://smsapi.free-mobile.fr/sendmsg?user=$USER&pass=$PASS&msg=Blog%20deployed\"]"
}
