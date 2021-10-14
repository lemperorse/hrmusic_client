<template>
  <q-page class="bg-calendar">
    <div class="flex flex-col pl-6 mt-6">
      <h1 class="text-3xl font-bold">Calendar</h1>
      <span>View Training Date</span>
    </div>
    <div class="flex flex-col justify-center items-center">
      <br />
      <div class="row justify-center items-center">
        <q-btn
          class="flex flex-col p-6 m-2"
          rounded
          color="primary"
          label="Prev"
          @click="calendarPrev"
        />
        <q-separator vertical />
        <q-btn
          class="flex flex-col p-6 m-2"
          rounded
          color="primary"
          label="Next"
          @click="calendarNext"
        />
      </div>
      <q-card flat bordered class="w-full p-2">
        <q-separator />
        <q-calendar
          class="flex flex-col p-2 m-2"
          ref="calendar"
          v-model="selectedDate"
          view="month"
          locale="en-us"
          animated
          transition-prev="slide-right"
          transition-next="slide-left"
        >
          <template #week="{ week, weekdays }">
            <template
              v-for="(computedEvent, index) in getWeekEvents(week, weekdays)"
            >
              <q-badge
                :key="index"
                :class="badgeClasses(computedEvent, 'day')"
                :style="badgeStyles(computedEvent, week.length)"
                @click="opentEventDialog(computedEvent.event)"
              >
                <template v-if="computedEvent.event">
                  <q-icon
                    :name="computedEvent.event.icon"
                    class="q-mr-xs"
                  ></q-icon>
                  <span class="ellipsis">{{ computedEvent.event.title }}</span>
                </template>
              </q-badge>
            </template></template
          >
        </q-calendar>
      </q-card>
      <div
        v-for="(data, i) in events"
        :key="i"
        class="w-10/12"
        @click="opentEventDialog(data)"
      >
        <q-item class="rounded-xl border-1 bg-white shadow-xl mt-2">
          <q-item-section avatar>
            <i
              class="em em-calendar text-xl"
              aria-role="presentation"
              aria-label="TEAR-OFF CALENDAR"
            ></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ data.mode }}</q-item-label>
            <q-item-label caption>
              <span class="text-base font-bold text-black">
                {{ data.title }}</span
              >
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <q-dialog v-model="eventDialog" >
      <q-card class="w-full p-4">
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">{{ form.mode }}</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ form.title }}</div>
            <div class="text-caption text-grey">
              {{ form.details }}
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <div class="text-overline">{{ form.start + " - " + form.end }}</div>
          <q-btn flat color="primary" v-close-popup> ปิด </q-btn>
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
  miniMode: boolean = true;
  eventDialog: any = false;
  form: any = [];
  $refs!: {
    calendar: HTMLFormElement;
  };
  CURRENT_DAY = new Date();
  selectedDate: any = "";
  events: any = [
    {
      title: "Fishing",
      details: "Time for some weekend R&R",
      color: "orange",
      start: "2021-09-09",
      end: "2021-09-22",
      icon: "cake",
      mode: "Easy",
    },
    {
      title: "Vacation",
      details:
        "Trails and hikes, going camping! Don't forget to bring bear spray!",
      color: "blue-grey",
      start: "2021-09-15",
      end: "2021-09-16",
      icon: "cake",
      mode: "Normal",
    },
    {
      title: "Visit mom",
      details: "Always a nice chat with mom",
      color: "blue-grey",
      start: "2021-09-20",
      end: "2021-09-20",
      icon: "cake",
      mode: "Hard",
    },
  ];
  async opentEventDialog(dataEvent: any) {
    this.form = dataEvent;
    this.eventDialog = true;
  }
  getCurrentDay(day: any) {
    const newDay = new Date();
    newDay.setDate(day);
    const tm: any = QCalendar.parseDate(newDay);
    return tm.date;
  }
  calendarNext() {
    this.$refs.calendar.next();
  }
  calendarPrev() {
    this.$refs.calendar.prev();
  }
  insertEvent(
    events: any,
    weekLength: any,
    infoWeek: any,
    index: any,
    availableDays: any,
    level: any
  ) {
    const iEvent: any = infoWeek[index];
    if (iEvent !== undefined && iEvent.left >= availableDays) {
      // If you have space available, more events are placed
      if (iEvent.left - availableDays) {
        // It is filled with empty events
        events.push({ size: iEvent.left - availableDays });
      }
      // The event is built
      events.push({ size: iEvent.size, event: iEvent.event });

      if (level !== 0) {
        // If it goes into recursion, then the item is deleted
        infoWeek.splice(index, 1);
      }

      const currentAvailableDays: any = iEvent.left + iEvent.size;
      if (currentAvailableDays < weekLength) {
        const indexNextEvent: any = QCalendar.toString().indexOf(
          infoWeek,
          Number(
            (e: any) => e.id !== iEvent.id && e.left >= currentAvailableDays
          )
        );

        this.insertEvent(
          events,
          weekLength,
          infoWeek,
          indexNextEvent !== -1 ? indexNextEvent : index,
          currentAvailableDays,
          level + 1
        );
      } // else: There are no more days available, end of iteration
    } else {
      events.push({ size: weekLength - availableDays });
      // end of iteration
    }
  }
  getWeekEvents(week: any, weekdays: any) {
    const tsFirstDay: any = QCalendar.parsed(week[0].date + " 00:00");
    const tsLastDay: any = QCalendar.parsed(
      week[week.length - 1].date + " 23:59"
    );
    const firstDay: any = QCalendar.getDayIdentifier(tsFirstDay);
    const lastDay: any = QCalendar.getDayIdentifier(tsLastDay);

    const eventsWeek: any = [];
    this.events.forEach((event: any, id: any) => {
      const tsStartDate: any = QCalendar.parsed(event.start + " 00:00");
      const tsEndDate: any = QCalendar.parsed(event.end + " 23:59");
      const startDate: any = QCalendar.getDayIdentifier(tsStartDate);
      const endDate: any = QCalendar.getDayIdentifier(tsEndDate);

      if (this.isBetweenDatesWeek(startDate, endDate, firstDay, lastDay)) {
        const left: any = QCalendar.daysBetween(tsFirstDay, tsStartDate);
        const right: any = QCalendar.daysBetween(tsEndDate, tsLastDay);

        eventsWeek.push({
          id, // index event
          left, // Position initial day [0-6]
          right, // Number days available
          size: week.length - (left + right), // Size current event (in days)
          event, // Info
        });
      }
    });

    const events: any = [];
    if (eventsWeek.length > 0) {
      const infoWeek: any = eventsWeek.sort(
        (a: any, b: any) => a.left - b.left
      );
      infoWeek.forEach((event: any, i: any) => {
        this.insertEvent(events, week.length, infoWeek, i, 0, 0);
      });
    }

    return events;
  }
  isBetweenDates(date: any, start: any, end: any) {
    return date >= start && date <= end;
  }
  isBetweenDatesWeek(
    dateStart: any,
    dateEnd: any,
    weekStart: any,
    weekEnd: any
  ) {
    return (
      (dateEnd < weekEnd && dateEnd >= weekStart) ||
      dateEnd === weekEnd ||
      (dateEnd > weekEnd && dateStart <= weekEnd)
    );
  }
  badgeClasses(infoEvent: any, type: any) {
    const color: any =
      infoEvent.event !== undefined ? infoEvent.event.color : "transparent";
    const cssColor: any = this.isCssColor(color);
    const isHeader: any = type === "header";

    return {
      [`text-white bg-${color}`]: !cssColor,
      "full-width": !isHeader && (!infoEvent.side || infoEvent.side === "full"),
      "left-side": !isHeader && infoEvent.side === "left",
      "right-side": !isHeader && infoEvent.side === "right",
      "cursor-pointer": infoEvent.event !== undefined,
      "q-day-event-void": infoEvent.event === undefined, // height: 0, padding: 0
    };
  }
  isCssColor(color: any) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
  }
  badgeStyles(infoEvent: any, weekLength: number) {
    const s: any = {};
    if (infoEvent.size !== undefined) {
      s.width = (100 / weekLength) * infoEvent.size + "% !important";
    }
    s["align-items"] = "flex-start";
    return s;
  }
}
</script>

<style scoped>
.bg-calendar {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='800' height='1300' preserveAspectRatio='none' viewBox='0 0 800 1300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1731%26quot%3b)' fill='none'%3e%3crect width='461.16' height='461.16' clip-path='url(%26quot%3b%23SvgjsClipPath1732%26quot%3b)' x='-68.98' y='930.15' fill='url(%23SvgjsPattern1733)' transform='rotate(92.81%2c 161.6%2c 1160.73)'%3e%3c/rect%3e%3cpath d='M168.66 629.8a5.6 5.6 0 1 0 11.19 0.41 5.6 5.6 0 1 0-11.19-0.41zM184.64 630.38a5.6 5.6 0 1 0 11.2 0.42 5.6 5.6 0 1 0-11.2-0.42zM200.63 630.97a5.6 5.6 0 1 0 11.2 0.42 5.6 5.6 0 1 0-11.2-0.42zM216.62 631.56a5.6 5.6 0 1 0 11.2 0.41 5.6 5.6 0 1 0-11.2-0.41zM136.09 644.61a5.6 5.6 0 1 0 11.19 0.41 5.6 5.6 0 1 0-11.19-0.41zM152.08 645.2a5.6 5.6 0 1 0 11.19 0.41 5.6 5.6 0 1 0-11.19-0.41zM168.07 645.78a5.6 5.6 0 1 0 11.19 0.42 5.6 5.6 0 1 0-11.19-0.42zM184.06 646.37a5.6 5.6 0 1 0 11.19 0.42 5.6 5.6 0 1 0-11.19-0.42z' stroke='%23e73635' stroke-width='1' stroke-dasharray='3%2c 3'%3e%3c/path%3e%3ccircle r='81.32923032364639' cx='524.58' cy='892.02' fill='%23d3b714'%3e%3c/circle%3e%3crect width='422.4' height='422.4' clip-path='url(%26quot%3b%23SvgjsClipPath1734%26quot%3b)' x='16.12' y='385.79' fill='url(%23SvgjsPattern1735)' transform='rotate(169.81%2c 227.32%2c 596.99)'%3e%3c/rect%3e%3crect width='204' height='204' clip-path='url(%26quot%3b%23SvgjsClipPath1736%26quot%3b)' x='443.89' y='135.42' fill='url(%23SvgjsPattern1737)' transform='rotate(196.5%2c 545.89%2c 237.42)'%3e%3c/rect%3e%3crect width='336' height='336' clip-path='url(%26quot%3b%23SvgjsClipPath1738%26quot%3b)' x='-90.18' y='443' fill='url(%23SvgjsPattern1739)' transform='rotate(159.86%2c 77.82%2c 611)'%3e%3c/rect%3e%3ccircle r='66.66666666666667' cx='33.77' cy='392.71' fill='%23d3b714'%3e%3c/circle%3e%3crect width='96' height='96' clip-path='url(%26quot%3b%23SvgjsClipPath1740%26quot%3b)' x='-18.09' y='39.25' fill='url(%23SvgjsPattern1741)' transform='rotate(78.36%2c 29.91%2c 87.25)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1731'%3e%3crect width='800' height='1300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='10.98' height='10.98' patternUnits='userSpaceOnUse' id='SvgjsPattern1733'%3e%3cpath d='M0 10.98L5.49 0L10.98 10.98' stroke='%23e73635' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1732'%3e%3ccircle r='115.29' cx='161.6' cy='1160.73'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='9.6' height='9.6' patternUnits='userSpaceOnUse' id='SvgjsPattern1735'%3e%3cpath d='M0 9.6L4.8 0L9.6 9.6' stroke='%23037b0b' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1734'%3e%3ccircle r='105.6' cx='227.32' cy='596.99'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1737'%3e%3cpath d='M0 6L3 0L6 6' stroke='%23037b0b' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1736'%3e%3ccircle r='51' cx='545.89' cy='237.42'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='336' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1739'%3e%3crect width='336' height='3' x='0' y='0' fill='%23d3b714'%3e%3c/rect%3e%3crect width='336' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1738'%3e%3ccircle r='84' cx='77.82' cy='611'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1741'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='rgba(144%2c 107%2c 232%2c 1)' fill='none' stroke-width='1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1740'%3e%3ccircle r='24' cx='29.91' cy='87.25'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
}
</style>
