<template>
    
  <section class="vh-100" style="background-color: #C0C0C0;">
  <div class="container py-5 ">
    <div class="row d-flex justify-content-center align-items-center h-100">
        
      <div class="col col-lg-8 col-xl-6">

        <div class="card rounded-3 header">
        <h3 class="mb-2"><span class="me-2 head">Website Todo</span> </h3>
        </div>
        
        <div class="card rounded-3 main">
            
          <div class="card-body p-4">
            

            
            

            <ul class="list-group rounded-0">
              <li class="list-group-item border-0 d-flex align-items-center ps-0" v-for="(post, index) in posts" v-bind:item="post" v-bind:index="index" v-bind:key="post._id" >
                <input v-if="post.done==1"  class="checkbox-round" v-on:change="donePost(post._id)" type="checkbox" value="" aria-label="..." checked/>
                <input v-else  class="checkbox-round" v-on:change="donePost(post._id)" type="checkbox" value="" aria-label="..." />
                <input :class="{done: Boolean(post.done)}"  class="input-text"  v-on:change="editPost(post._id,post.text)" type="text" v-model="post.text">
                
                <button  class="delete" v-on:click="deletePost(post._id)" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></button>
              </li>
              
            </ul>
            

            

          

          </div>
        </div>
        <button  type="button" v-on:click="createPost" class="btn btn-info add-new"><i class="fa fa-plus"></i>+ Add </button>
      </div>
    </div>
  </div>
</section>

</template>

<script>
import PostService from '../PostService'
export default {
  name: 'PostComponent',
  data(){
    return {
      posts: [],
      error: '',
      text: '',
      
    }
  },
  async created() {
    try{
        this.posts = await PostService.getPosts();
    }catch(err){
      this.error = err.message;

    }
  },
  methods:{
    async createPost(){
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id){
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async editPost(id,text){
      
      
      await PostService.updatePost(id,text); 
      this.posts = await PostService.getPosts();
   

    },
    async donePost(id){
        await PostService.donePost(id);
        this.posts = await PostService.getPosts();

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import url(https://fonts.googleapis.com/css?family=Roboto|Varela+Round|Open+Sans);
@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css);
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);
body {
	font-family: Roboto;
  background: -webkit-linear-gradient(90deg, #2BC0E4 10%, #EAECC6 90%); }
h1 {
	background: hsl(290, 33%, 48%);
	color: white;
	margin-bottom: 20px;
	padding: 10px 20px;
	
	font-size: 24px;
	font-weight: normal;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;}
.header {
    margin-bottom: 15px;
    background: #a759db;
}
.head {
    margin-top: 10px;
    color: #ffffff;
}
.text-input{
    border: 0;
}
.delete{
    color: #a759db;
    border: 0;
}
.add-new{
    background: #a759db;
    /* border-radius: 15% 15% 15% 15%; */
    border-radius: 80px/100px;
    width: 150px;
    height: 50px;
    font-weight: 700;
}
.checkbox-round {
    width: 1em;
    height: 1em;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #a759db;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    margin-right: 10px;
}

.checkbox-round:checked {
    background-color: #a759db;
}
.card{
    align-items: center;
}
.done{
    border: 0;
    text-decoration-line: line-through;
}
.input-text{
    border: 0;
    color: #a759db;
    font-size: 20px;

}
.mb-2 {
    margin-top: 10px;
}
.card .main{
    position: absolute;
}
</style>


