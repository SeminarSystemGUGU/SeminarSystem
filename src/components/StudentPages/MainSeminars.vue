<template>
  <div>


    <div class="panel-group" id="accordion">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#collapseOne">
              点击我进行展开，再次点击我进行折叠。第 1 部分
            </a>
          </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in">
          <div class="panel-body">

          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#collapseTwo">
              点击我进行展开，再次点击我进行折叠。第 2 部分
            </a>
          </h4>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse">
          <div class="panel-body">

          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#collapseThree">
              点击我进行展开，再次点击我进行折叠。第 3 部分
            </a>
          </h4>
        </div>
        <div id="collapseThree" class="panel-collapse collapse">
          <div class="panel-body">

          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

  export default {
    name: "MainSeminars",
    components:{

    },
    data(){
      return{
        title:"我的课程",
        courseName:"OOAD"
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
  .panel-heading{
    background-color: orange;
  }

</style>
