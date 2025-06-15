import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export default class ApiService {
  static BASE_URL = BASE_URL;

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  // ✅ Use ApiService.BASE_URL throughout the class like you already do
  static async registerUser(registration) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response.data;
  }

  
  // *****AUTH

  // REGISTER NEW USER
  static async registerUser(registration) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response.data;
  }

  // LOGIN USER
  static async loginUser(loginData) {
    const response = await axios.post(`${this.BASE_URL}/auth/login`, loginData);
    return response.data;
  }

  // ***** USER

  // ALL USERS
  static async getAllUsers() {
    const response = await axios.get(`${this.BASE_URL}/user/all`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  // LOGGED USER PROFILE INFO
  static async getUserProfile() {
    const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  // SINGLE USER INFO BY ID
  static async getUser(userId) {
    const response = await axios.get(`${this.BASE_URL}/user/search/${userId}`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  // LIST OF USERS(Username, NAMES)
  static async getAllUsersNameList() {
    const response = await axios.get(`${this.BASE_URL}/user/names`, {
      headers: this.getHeader(),
    });    
    return response.data;
  }

  // DELETE USER 
  static async deleteUser() {
    const response = await axios.delete(
      `${this.BASE_URL}/user/delete`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  // DELETE USER Admin
  static async deleteUserById(userId) {
    const response = await axios.delete(
      `${this.BASE_URL}/user/delete/${userId}`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  // UPDATE USER DETAILS
  static async updateUser(updateUser) {
    const response = await axios.post(
      `${this.BASE_URL}/user/update`,
      updateUser,
      { headers: this.getHeader() }
    );
    return response.data;
  }

   // UPDATE USERNAME
  static async updateUsername(username) {
    const response = await axios.post(
      `${this.BASE_URL}/user/username`,
      username,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  // CHANGE ROLE FROM USER TO ADMIN
  static async updateRoleToAdmin(userId) {
    const response = await axios.put(
      `${this.BASE_URL}/user/role/${userId}`,
      null,
      // TODO : when backend is updated in place of null add role
      { headers: this.getHeader() }
    );
    return response.data;
  }

  //   ****** TASK
  // CREATE NEW TASK
  static async createTask(taskData) {
    const response = await axios.post(
      `${this.BASE_URL}/task/create`,
      taskData,
      { headers: this.getHeader() }
    );


    return response.data;
  }

  static async findTask(id) {
    const response = await axios.get(`${this.BASE_URL}/task/${id}`,
      { headers: this.getHeader() }
    );

    return response.data;
  }

  //   UPDATE TASK DETAILS
  static async updateTask(updateTaskData, taskId) {
    const response = await axios.put(
      `${this.BASE_URL}/task/update/${taskId}`,
      updateTaskData,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  //   DELETE TASK
  static async deleteTask(taskId) {
    const response = await axios.delete(
      `${this.BASE_URL}/task/delete/${taskId}`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  //   ALL TASKS FOR ADMIN ONLY
  static async getAllTasks() {
    const response = await axios.get(`${this.BASE_URL}/task/all-tasks`, { headers: this.getHeader() });

    return response.data;
  }

  //   FIND TASKS BY STATUS
  static async getTaskByStatus(status) {
    const response = await axios.get(`${this.BASE_URL}/task/status/${status}`, { headers: this.getHeader() });
    return response.data;
  }


  //   FIND TASKS BY PRIORITY
  static async getTaskByPriority(priority) {
    const response = await axios.get(`${this.BASE_URL}/task/priority/${priority}`, { headers: this.getHeader() });

    return response.data;
  }

  //   TASK THAT ARE ASSIGNED 
  static async getAssignedTasks() {
    const response = await axios.get(`${this.BASE_URL}/task/assigned`, { headers: this.getHeader() });
    return response.data;
  }

  //   TASK THAT ARE OWNed 
  static async getOwnedTasks() {
    const response = await axios.get(`${this.BASE_URL}/task/created`, { headers: this.getHeader() });
    return response.data;
  }


  //   MARK TASK AS COMPLETED 
  static async markAsCompleted(taskId) {
    const response = await axios.post(`${this.BASE_URL}/task/complete/${taskId}`, null, { headers: this.getHeader() });

    return response.data;
  }

  //  MARK TASK AS IN_PROCESS
  static async markAsProcess(taskId) {
    const response = await axios.post(`${this.BASE_URL}/task/process/${taskId}`, null, { headers: this.getHeader() });

    return response.data;
  }


  //all task for logged user
  static async featchAllMyTasks() {
    const response = await axios.get(`${this.BASE_URL}/task/my-tasks`, { headers: this.getHeader() });
    return response.data;
  }

  // ******* Statistical Data

  static async overviewTasks() {
    const response = await axios.get(`${this.BASE_URL}/task/overview`, { headers: this.getHeader() });

    return response.data;
  }

  //******** NOTE DATA API*/
  static async getNoteById(id){
    const response = await axios.get(`${this.BASE_URL}/note/${id}`,{headers: this.getHeader() });

    return response.data
  }

  static async getAllNotes(){
    const response = await axios.get(`${this.BASE_URL}/note/all`,{headers: this.getHeader() });

    return response.data
  }

  static async createNote(note){
    const response = await axios.post(`${this.BASE_URL}/note/create`, note, {headers: this.getHeader() });    
    return response.data
  }

  static async deleteNote(noteId) {
    const response = await axios.delete(
      `${this.BASE_URL}/note/${noteId}`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async updateNote(noteId, note){
    const response = await axios.post(`${this.BASE_URL}/note/${noteId}`, note, {headers: this.getHeader() });    
    return response.data
  }

  //   ****** AUTHENTICATION CHECK

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem('role');
    return role === 'ADMIN'
  }


  static isUser() {
    const role = localStorage.getItem('role');
    return role === 'USER'
  }


}
