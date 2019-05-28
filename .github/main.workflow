workflow "Build and Deploy Blog" {
  on = "push"
  resolves = ["Deploy Blog"]
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
