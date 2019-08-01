workflow "Build and Deploy Blog" {
  on = "push"
  resolves = ["Notify Me"]
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
  secrets = [
    "ACTIONS_DEPLOY_KEY",
  ]
}

action "Notify Me" {
  uses = "swinton/httpie.action@master"
  needs = ["Deploy Blog"]
  secrets = ["FREE_ID_KEY", "FREE_USER"]
  args = ["GET", "smsapi.free-mobile.fr/sendmsg", "user==$FREE_USER", "pass==$FREE_ID_KEY", "msg=='Blog deployed !'"]
}
