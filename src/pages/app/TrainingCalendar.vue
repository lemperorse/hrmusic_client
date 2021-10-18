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
      <br />
      <div
        v-for="(data, i) in events"
        :key="i"
        class="w-10/12"
        @click="opentEventDialog(data)"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
      >
        <q-item class="rounded-xl border-1 shadow-xl mt-2">
          <q-item-section avatar>
            <i
              class="em em-calendar text-xl"
              aria-role="presentation"
              aria-label="TEAR-OFF CALENDAR"
            ></i>
          </q-item-section>
          <q-item-section>
            <q-item-label
              class="text-base"
              :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >{{ data.mode }}</q-item-label
            >
            <q-item-label caption>
              <span
                class="text-base font-bold"
                :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >
                {{ data.title }}</span
              >
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <br />
    </div>
    <q-dialog v-model="eventDialog">
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
</style>
