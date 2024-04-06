export default function navigationList(currentLogged, currentProperty) {
    return ([
        {
            icon: "homeIcon",
            text: "Home",
            link: currentLogged?.id.match(/admin.[0-9]*/)
                ? "../../admin/adminlanding"
                : "../landing"
        },
        {
            icon: "rightArrowIcon",
            text: [currentProperty?.property_name],
            link: "../propertysummary"
        },
        {
            icon: "rightArrowIcon",
            text: "Bookings",
            link: "../bookings"
        },
        {
            icon: "rightArrowIcon",
            text: "View Booking",
            link: ""
        }
    ])
}
