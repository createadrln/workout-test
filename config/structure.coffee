# Read more about app structure at http://docs.appgyver.com

module.exports =

# initialView:
#   id: "initialView"
#   location: "onboarding#index"

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
# tabs: [
#   {
#     title: "Exercises"
#     id: "exercise"
#     location: "exercise#index"
#   }
#   {
#     title: "Workouts"
#     id: "workout"
#     location: "workout#index"
#   }
# ]

  rootView:
    location: "onboarding#index"

# preloads: [
#   {
#     id: "learn-more"
#     location: "example#learn-more"
#   }
#   {
#     id: "using-the-scanner"
#     location: "example#using-the-scanner"
#   }
# ]

# drawers:
#   left:
#     id: "leftDrawer"
#     location: "example#drawer"
#     showOnAppLoad: false
#   options:
#     animation: "swingingDoor"
#