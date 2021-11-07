<template>
<q-card class="m-4 p-2">
    <table id="program-table" style="width: 100%;" border="1" cellpadding="2"  >
        <tbody>
            <tr>
                <th>Place Zone</th>
                <th>Duration</th>
                <th>Rest Zone</th>
                <th>Rest Duration</th>
                <th>Reps</th>
            </tr>
            <tr v-for="(duration,i) in durations" :key="i"> 
                <td>{{duration.place}}</td>
                <td>{{duration.duration}}</td>
                <td>{{duration.rest}}</td>
                <td>{{duration.rest_duration}}</td>
                <td>{{duration.reps}}</td>
            </tr>
        </tbody>
    </table> 
</q-card>
</template>

<script>
export default {
    props: {
        durations: {
            default: []
        }
    }
}
</script>

<style>
#program-table > tbody > tr > th {
    font-weight: bold!important;
}

#program-table > tbody > tr > td {
     text-align: center;
}

#program-table{
      border-collapse: collapse;
  width: 100%;
}

#program-table,  td,  th {
  border: 1px solid black;
}
 </style>
