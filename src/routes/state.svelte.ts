class Settings {
	#participants = $state<string[]>([]);
	#powers = $state<string[]>([
		'Cyclone: All presents shift clockwise',
		'Reverse Cyclone: All presents shift anti-clockwise',
		'Round Robin: Pick three people who must exchange presents with each other',
		'Christmas Spirit: Force someone to open a present',
		'Ungrateful: If there is a present in the pile, you may swap with it (even after opening yours)',
		'Sticky Beak: Inspect any two unopened presents before your next action',
		'Mirror: Copy the last ability that was used',
		'Undo: Reverse the last ability used (Only moving magic)',
	]);

	select_random(arr: string[]) {
		if (arr.length === 0) return '';
		const rando = Math.floor(Math.random() * arr.length);
		const selected = arr.splice(rando, 1)[0];

		return selected;
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
		const rando = Math.floor(Math.random() * this.#powers.length);
		const selected = this.#powers.slice();
		return selected.splice(rando, 1)[0];
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
