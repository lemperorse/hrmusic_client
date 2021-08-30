<template>
  <q-page class="bg-calendar">
    <div class="flex flex-col pl-6 mt-6">
      <h1 class="text-3xl font-bold">Calendar</h1>
      <span>View Training Date</span>
    </div>
    <div class="flex flex-col justify-center items-center">
      <div class="row justify-center items-center">
        <q-btn flat dense label="Prev" @click="calendarPrev" />
        <q-separator vertical />
        <q-btn flat dense label="Next" @click="calendarNext" />
      </div>
      <br />
      <div style="max-width: 800px; width: 100%">
        <q-calendar
          ref="calendar"
          v-model="selectedDate"
          view="month"
          locale="en-us"
          :day-height="100"
          date="2021-08-12"
        >
          <template #day="{ timestamp }">
            <template v-for="(event, index) in getEvents(timestamp.date)">
              <q-badge
                @click="opentEventDialog(event)"
                :key="index"
                style="
                  width: 100%;
                  cursor: pointer;
                  height: 16px;
                  max-height: 16px;
                  padding:10px
                "
                class="
                  q-row-event
                  text-white
                  bg-purple
                  full-width
                  cursor-pointer
                  q-day-event-void
               
                "
              >
                <q-icon
                  v-if="event.icon"
                  :name="event.icon"
                  class="q-mr-xs"
                ></q-icon
                ><span class="ellipsis">{{ event.title }}</span>
              </q-badge>
            </template>
          </template>
        </q-calendar>
      </div>
      <div v-for="x in 5" :key="x" class="w-10/12">
        <q-item class="rounded-xl border-1 bg-white shadow-xl mt-2">
          <q-item-section avatar>
            <i
              class="em em-calendar text-xl"
              aria-role="presentation"
              aria-label="TEAR-OFF CALENDAR"
            ></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Easy</q-item-label>
            <q-item-label caption>
              <span class="text-base font-bold text-black"> Walk to Moon</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <q-dialog v-model="eventDialog" persistent>
      <q-card class="w-full p-4">
        <h2 class="text-xl p-4">{{ from.title }}</h2>
        <q-card-section class="rounded-xl border-2 border-blue-400 w-full">
          <div class="text-h6">{{ from.date }}</div>
          <div class="text-h6">{{ from.details }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
</script><script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import QCalendar from "@quasar/quasar-ui-qcalendar";
@Component({
  components: {},
})
export default class PageIndex extends Vue {
  $refs!: {
    calendar: HTMLFormElement;
  };
  eventDialog: any = false;
  selectedDate: any = [];
  from: any = [];
  dateRang: any = [
    { from: "2020/07/01", to: "2020/07/10" },
    { from: "2020/07/21", to: "2020/07/25" },
  ];
  events: any = [
    {
      title: "1st of the Month",
      details: "Everything is funny as long as it is happening to someone else",
      date: "2021-08-12",
      bgcolor: "orange",
    },
    {
      title: "Sisters Birthday",
      details: "Buy a nice present",
      date: "2021-08-09",
      bgcolor: "green",
      icon: "fas fa-birthday-cake",
    },
    {
      title: "Visit mom",
      details: "Always a nice chat with mom",
      date: "2021-08-23",
      bgcolor: "green",
      icon: "fas fa-birthday-cake",
    },
    {
      title: "Vacation",
      details:
        "Trails and hikes, going camping! Don't forget to bring bear spray!",
      date: "2021-08-07",
      bgcolor: "green",
      icon: "fas fa-birthday-cake",
    },
    {
      title: "Fishing",
      details: "Time for some weekend R&R",
      date: "2021-08-29",
      bgcolor: "green",
      icon: "fas fa-birthday-cake",
    },
  ];
  async open() {
    console.log("rew");
  }
  opentEventDialog(date: any) {
    this.from = date;
    this.eventDialog = true;
  }
  calendarNext() {
    this.$refs.calendar.next();
  }
  calendarPrev() {
    this.$refs.calendar.prev();
  }
  getEvents(dt: any) {
    console.log("dt", dt);
    const currentDate: any = QCalendar.parsed(dt);
    const events: any = [];
    for (let i = 0; i < this.events.length; ++i) {
      let added = false;
      const event = this.events[i];
      if (event.date === dt) {
        if (event.time) {
          if (events.length > 0) {
            // check for overlapping times
            const startTime: any = QCalendar.parsed(
              event.date + " " + event.time
            );
            const endTime = QCalendar.addToDate(startTime, {
              minute: event.duration,
            });
            for (let j = 0; j < events.length; ++j) {
              if (events[j].time) {
                const startTime2: any = QCalendar.parsed(
                  events[j].date + " " + events[j].time
                );
                const endTime2 = QCalendar.addToDate(startTime2, {
                  minute: events[j].duration,
                });
                if (
                  QCalendar.isBetweenDates(startTime, startTime2, endTime2) ||
                  QCalendar.isBetweenDates(endTime, startTime2, endTime2)
                ) {
                  events[j].side = "left";
                  event.side = "right";
                  events.push(event);
                  added = true;
                  break;
                }
              }
            }
          }
        }
        if (!added) {
          event.side = undefined;
          events.push(event);
        }
      } else if (event.days) {
        // check for overlapping dates
        const startDate: any = QCalendar.parsed(event.date);
        const endDate = QCalendar.addToDate(startDate, { day: event.days });
        if (QCalendar.isBetweenDates(currentDate, startDate, endDate)) {
          events.push(event);
          added = true;
        }
      }
    }
    return events;
  }
}
</script>

<style scoped>
.bg-calendar {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='800' height='1300' preserveAspectRatio='none' viewBox='0 0 800 1300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1731%26quot%3b)' fill='none'%3e%3crect width='461.16' height='461.16' clip-path='url(%26quot%3b%23SvgjsClipPath1732%26quot%3b)' x='-68.98' y='930.15' fill='url(%23SvgjsPattern1733)' transform='rotate(92.81%2c 161.6%2c 1160.73)'%3e%3c/rect%3e%3cpath d='M168.66 629.8a5.6 5.6 0 1 0 11.19 0.41 5.6 5.6 0 1 0-11.19-0.41zM184.64 630.38a5.6 5.6 0 1 0 11.2 0.42 5.6 5.6 0 1 0-11.2-0.42zM200.63 630.97a5.6 5.6 0 1 0 11.2 0.42 5.6 5.6 0 1 0-11.2-0.42zM216.62 631.56a5.6 5.6 0 1 0 11.2 0.41 5.6 5.6 0 1 0-11.2-0.41zM136.09 644.61a5.6 5.6 0 1 0 11.19 0.41 5.6 5.6 0 1 0-11.19-0.41zM152.08 645.2a5.6 5.6 0 1 0 11.19 0.41 5.6 5.6 0 1 0-11.19-0.41zM168.07 645.78a5.6 5.6 0 1 0 11.19 0.42 5.6 5.6 0 1 0-11.19-0.42zM184.06 646.37a5.6 5.6 0 1 0 11.19 0.42 5.6 5.6 0 1 0-11.19-0.42z' stroke='%23e73635' stroke-width='1' stroke-dasharray='3%2c 3'%3e%3c/path%3e%3ccircle r='81.32923032364639' cx='524.58' cy='892.02' fill='%23d3b714'%3e%3c/circle%3e%3crect width='422.4' height='422.4' clip-path='url(%26quot%3b%23SvgjsClipPath1734%26quot%3b)' x='16.12' y='385.79' fill='url(%23SvgjsPattern1735)' transform='rotate(169.81%2c 227.32%2c 596.99)'%3e%3c/rect%3e%3crect width='204' height='204' clip-path='url(%26quot%3b%23SvgjsClipPath1736%26quot%3b)' x='443.89' y='135.42' fill='url(%23SvgjsPattern1737)' transform='rotate(196.5%2c 545.89%2c 237.42)'%3e%3c/rect%3e%3crect width='336' height='336' clip-path='url(%26quot%3b%23SvgjsClipPath1738%26quot%3b)' x='-90.18' y='443' fill='url(%23SvgjsPattern1739)' transform='rotate(159.86%2c 77.82%2c 611)'%3e%3c/rect%3e%3ccircle r='66.66666666666667' cx='33.77' cy='392.71' fill='%23d3b714'%3e%3c/circle%3e%3crect width='96' height='96' clip-path='url(%26quot%3b%23SvgjsClipPath1740%26quot%3b)' x='-18.09' y='39.25' fill='url(%23SvgjsPattern1741)' transform='rotate(78.36%2c 29.91%2c 87.25)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1731'%3e%3crect width='800' height='1300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='10.98' height='10.98' patternUnits='userSpaceOnUse' id='SvgjsPattern1733'%3e%3cpath d='M0 10.98L5.49 0L10.98 10.98' stroke='%23e73635' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1732'%3e%3ccircle r='115.29' cx='161.6' cy='1160.73'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='9.6' height='9.6' patternUnits='userSpaceOnUse' id='SvgjsPattern1735'%3e%3cpath d='M0 9.6L4.8 0L9.6 9.6' stroke='%23037b0b' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1734'%3e%3ccircle r='105.6' cx='227.32' cy='596.99'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1737'%3e%3cpath d='M0 6L3 0L6 6' stroke='%23037b0b' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1736'%3e%3ccircle r='51' cx='545.89' cy='237.42'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='336' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1739'%3e%3crect width='336' height='3' x='0' y='0' fill='%23d3b714'%3e%3c/rect%3e%3crect width='336' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1738'%3e%3ccircle r='84' cx='77.82' cy='611'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1741'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='rgba(144%2c 107%2c 232%2c 1)' fill='none' stroke-width='1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1740'%3e%3ccircle r='24' cx='29.91' cy='87.25'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
}
</style>
