# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "Exercises"
      id: "exercise"
      location: "exercise#index"
    }
    {
      title: "Days"
      id: "day"
      icon: "icons/calendar.svg"
      location: "day#index" # Supersonic module#view type navigation
    }
    {
      title: "Workouts"
      id: "workout"
      location: "workout#index"
    }
    {
      title: "Info"
      id: "info"
      location: "info#index"
    }
  ]

# rootView:
#   location: "example#getting-started"

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
#  initialView:
#    id: "initialView"
#    location: "exercise#index"
