class Settings {
	#participants = $state<string[]>([]);
	#powers = $state<string[]>([
		'Rotate presents clockwise',
		'Rotate presents anti-clockwise',
		'Pick three people that all have to exchange presents',
		'Force someone to open a present',
		'If there is a present in the pile you may swap (even after opening)',
		'Before your next action you are allowed to inspect 2 presents before stealing/opening'
	]);

	select_random(arr: string[]) {
		if (arr.length === 0) return '';
		const rando = Math.floor(Math.random() * arr.length);
		const selected = arr.splice(rando, 1)[0];

		return selected;
	}

	get card() {
		return {
			participant: this.#participants[0],
			powers: this.#powers[0]
		};
	}

	get participant() {
		return this.select_random(this.#participants);
	}
	set participant(value: string) {
		if (this.#participants.includes(value)) return;
		this.#participants.push(value);
	}

	get participants() {
		return this.#participants;
	}
	set participants(value: string[]) {
		this.#participants = value;
	}

	get power() {
		return this.select_random(this.#powers);
	}
	set power(value: string) {
		if (this.#powers.includes(value)) return;
		this.#powers.push(value);
	}

	get powers() {
		return this.#powers;
	}
	set powers(value: string[]) {
		this.#powers = value;
	}
}

export const settings = new Settings();
