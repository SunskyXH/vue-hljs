workflow "CI" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@c555744"
  args = "install"
}

action "Test" {
  uses = "actions/npm@c555744"
  needs = ["Install"]
  args = "test"
}
