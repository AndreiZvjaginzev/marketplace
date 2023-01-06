
let state = {
    preloader: {
        isLoadPage: false,
        isFetch: false
    },
    validateInput: {
        fields: [],//{
            // fieldEmail: {
                // touch: false,
                // valid: false,
                // value: '',
                // message: '',
                // checks: [
                //     {
                //         f:function (value){
                //             const minLength = 3;
                //             return (value.length < minLength)
                //                         ? {result: false, msg: this.msg}
                //                         : {result: true};
                //         },
                //         message: 'Minimum field length: 3'
                //     },
                //     {
                //         f:function (value){
                //             var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            
                //             return (!reg.test(value))
                //                         ? {result: false, msg: this.msg}
                //                         : {result: true};
                //         },
                //         message: "Email is not entered correctly"
                //     }
                // ],
            //},
        //     fieldPassword: {
        //         // touch: false,
        //         // valid: false,
        //         // message: '',
        //         // value: '',
        //         // checks:[
        //         //     {
        //         //         f:function (value){
        //         //             return (value.length < 3)
        //         //                         ? {result: false, msg: this.message}
        //         //                         : {result: true};
        //         //         },
        //         //         message:"Minimum field length: 3"
        //         //     },
        //         //     {
        //         //         f:function(value){
        //         //             return (value.length  > 255)
        //         //                         ? {result: false, message: this.message}
        //         //                         : {result: true};
        //         //         },
        //         //         message:"Maximum field length: 255"
        //         //     }
        //         // ]
        //     },
        //     fieldTheme: {
        //         // touch: false,
        //         // valid: true,
        //         // message: '',
        //         // value: '',
        //         // checks:[     
        //         //     {
        //         //         f:function(value){
        //         //             return (value.length  > 100)
        //         //                         ? {result: false, message: this.message}
        //         //                         : {result: true};
        //         //         },
        //         //         message:"Maximum field length: 100"
        //         //     }
        //         // ]
        //     },
        //     fieldTextarea: {
        //         // touch: false,
        //         // valid: true,
        //         // message: '',
        //         // value: '',
        //         // checks:[
        //         //     {
        //         //         f:function (value){
        //         //             return (value.length < 4)
        //         //                         ? {result: false, msg: this.message}
        //         //                         : {result: true};
        //         //         },
        //         //         message:"Minimum field length: 4"
        //         //     },
        //         //     {
        //         //         f:function(value){
        //         //             return (value.length  > 1200)
        //         //                         ? {result: false, message: this.message}
        //         //                         : {result: true};
        //         //         },
        //         //         message:"Maximum field length: 1200"
        //         //     }
        //         // ]
        //     },
        //     fieldFile: {
        //         // touch: false,
        //         // valid: true,
        //         // message: '',
        //         // value: '',
        //         // checks:[
        //         //     {
        //         //         f:function (value){
        //         //             return (value.type !== "image/jpeg")
        //         //                         ? {result: false, msg: this.message}
        //         //                         : {result: true};
        //         //         },
        //         //         message:"Картинка должна быть в формате jpeg"
        //         //     },
                    
        //         // ]
        //     },
        // },
        formButton: false
    },
    auth: {
        token: null,
        name: null,
        email: null,
        msg: null,
        image_path: null,
        roles: null,
    },
    msg: "",
    drag: null,
    appeal: {
        success: false,
        data: null
    },
}

export default state;