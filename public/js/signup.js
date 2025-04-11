const btn=document.getElementById("signupBtn");

btn.addEventListener("click",function(e){
    e.preventDefault();
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;
    const confirmPassword=document.getElementById("confirmPW").value;

    if(password!==confirmPassword){
        alert("Passwords do not match");
        return;
    }

    fetch("/api/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
    }).then(res=>{
        if(res.status===200){
            res.json().then(({id,username})=>{
                console.log("User created:",id,username);
                
                localStorage.setItem("user_id",id);
                localStorage.setItem("username",username);
                
                username.value="";
                password.value="";
                confirmPassword.value="";
                
                window.location.href="/workday";
            })
            }else{
            res.json().then(data=>{
                alert(data.message);
            })
        }
    })
})