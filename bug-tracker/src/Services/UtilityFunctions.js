const checkIfUserOnProject = (user, userList) =>{
    for(const userL of userList){
        if(user.id === userL.uid){
            return true;
            }
    }
    return false;
}
export default checkIfUserOnProject;