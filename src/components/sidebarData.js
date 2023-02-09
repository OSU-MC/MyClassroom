import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DateRangeIcon from '@mui/icons-material/DateRange';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

/*Data for each of the sidebars needed*/
export const instructorSidebarData = [
    {
        title: "Courses",
        icon: <FeaturedPlayListIcon />,
        link: "/instructor/landing"
    },
    {
        title: "Questions",
        icon: <QuestionMarkIcon />,
        link: "/instructor_questions"
    },
    {
        title: "Students",
        icon: <SchoolIcon />,
        link: "/instructor_students"
    },
    {
        title: "Gradebook",
        icon: <MenuBookIcon />,
        link: "/instructor_gradebook"
    },
    {
        title: "Calendar",
        icon: <DateRangeIcon />,
        link: "/instructor_calendar"
    }
]

export const studentSidebarData = [
    {
        title: "Courses",
        icon: <FeaturedPlayListIcon />,
        link: "student_lectures"
    },
    {
        title: "Gradebook",
        icon: <MenuBookIcon />,
        link: "student_gradebook"
    },
    {
        title: "Calendar",
        icon: <DateRangeIcon />,
        link: "student_calendar"
    }
]