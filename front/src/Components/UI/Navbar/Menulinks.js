let menulinks = [
    {id:1, name: "Home",route: "/", status: false, children:[]},
    {id:2, name: "Network",route: null, status: false, children:[
        {id:9, name: "Activity",route: "/activity", status: false, children:[]},
        {id:10, name: "Photos",route: "/photos", status: false, children:[]},
        {id:11, name: "Forums",route: "/forums", status: false, children:[]},

    ]},
    {id:3, name: "Products",route: null, status: false, children:[
        {id:12, name: "All Products",route: "/all-products", status: false, children:[]},
        {id:13, name: "Categories",route: "/categories", status: false, children:[]},

    ]},
    {id:4, name: "Jobs",route: null, status: false, children:[
        {id:14, name: "All Jobs",route: "/all-jobs", status: false, children:[]},
        {id:15, name: "Job Categories",route: "/job-categories", status: false, children:[]},
    ]},
    {id:5, name: "Classfields",route: null, status: false, children:[
        {id:12, name: "All Adverts",route: "/adverts", status: false, children:[]},
        {id:13, name: "Advert Categories",route: "/advert-categories", status: false, children:[]},
    ]},
    {id:6, name: "Register",route: "/registration", status: false, children:[]},
    {id:7, name: "Blog",route: null, status: false, children:[]},
    {id:8, name: "Contact",route: "/contact", status: false, children:[]},
];
export default menulinks;