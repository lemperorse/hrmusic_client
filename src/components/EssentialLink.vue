<template>
<q-item clickable tag="a" target="_blank" @click="$router.push(`${link}`)">
    <q-item-section v-if="icon" avatar> 
        <i :class="`${icon} text-xl`" aria-role="presentation" aria-label="TEAR-OFF CALENDAR"></i>
    </q-item-section>

    <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
            {{ caption }}
        </q-item-label>
    </q-item-section>
</q-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class EssentialLink extends Vue {
    @Prop({ type: String, required: true }) readonly title!: string;
    @Prop({ type: String, default: '' }) readonly caption!: string;
    @Prop({ type: String, default: '#' }) readonly link!: string;
    @Prop({ type: String, default: '' }) readonly icon!: string;
}
</script>
