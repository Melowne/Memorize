import { Field } from './Types/Field';
import { Ref, ref } from 'vue';

class Memorize {
    private static instance: Memorize;
    private results: Ref<{ x: number; y: number }[]> = ref([]);
    private counter = ref(0);
    private limit = ref(3);
    private intervalId: number | null = null;
    public fails = ref(0);
    public bestRun = ref(0);
    public fields: Ref<Field[][]> = ref([]);
    private counterResults = ref(0);

    public static getInstance(): Memorize {
        return this.instance || new Memorize();
    }

    private setFields = () => {
        for (let i = 0; i < 5; i++) {
            this.fields.value[i] = [];
            for (let j = 0; j < 5; j++) {
                this.fields.value[i].push({
                    x: i,
                    y: j,
                    class: '',
                    active: false
                });
            }
        }
    };

    private setRndField = () => {
        let x, y;
        do {
            x = Math.floor(Math.random() * 5);
            y = Math.floor(Math.random() * 5);
        } while (this.fields.value[x][y].active);

        const field = { x, y, class: 'active', active: true };
        this.fields.value[x][y] = field;
        this.results.value.push({ x, y });
    };

    public checkField = (x: number, y: number) => {
        if (this.intervalId === null) {
            if (
                this.results.value[this.counterResults.value].x == x &&
                this.results.value[this.counterResults.value].y == y
            ) {
                this.counterResults.value++;
                this.fields.value[x][y].class = 'active-clicked';
            } else this.fails.value++;
            if (this.counterResults.value === this.limit.value - 1) {
                this.counterResults.value = 0;
                if (this.bestRun.value < this.limit.value)
                    this.bestRun.value = this.limit.value - 1;
                this.reset();
            }
            if (this.fails.value == 3) {
                this.resetAll();
            }
        }
    };

    private startRoutine = () => {
        this.intervalId = setInterval(() => {
            if (this.counter.value < this.limit.value) {
                this.counter.value++;
                this.setRndField();
            } else {
                this.limit.value++;
                this.counter.value = 0;
                this.setFields();
                clearInterval(this.intervalId!);
                this.intervalId = null;
            }
        }, 1100);
    };

    private reset = () => {
        this.results.value = [];
        this.setFields();
        this.startRoutine();
    };

    public resetAll = () => {
        this.limit.value = 3;
        this.counter.value = 0;
        this.counterResults.value = 0;
        this.fails.value = 0;
        this.reset();
    };
}

export default Memorize.getInstance();
