workflow "Build and Deploy Blog" {
  resolves = ["Notify Me"]
  on = "push"
}

action "Install packages" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Build Blog" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install packages"]
  args = "run build"
}

action "Deploy Blog" {
  needs = "Build Blog"
  uses = "peaceiris/actions-gh-pages@v1.0.1"
  env = {
    PUBLISH_DIR = "./public"
    PUBLISH_BRANCH = "master"
  }
  secrets = ["GITHUB_PAGES_ACTIONS_DEPLOY_KEY"]
}

action "Notify Me" {
  uses = "swinton/httpie.action@8ab0a0e926d091e0444fcacd5eb679d2e2d4ab3d"
  needs = ["Deploy Blog"]
  secrets = ["USER", "PASS"]
  args = "[\"GET\", \"https://smsapi.free-mobile.fr/sendmsg?user=$USER&pass=$PASS&msg=Blog%20deployed\"]"
}
