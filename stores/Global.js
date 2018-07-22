import Axios from "axios";
import {autorun, computed, observable} from "mobx";

const API_BASE = 'http://188.246.227.125/api/v1.0/';

export default class Global {
  @observable  mineClose = [];
  @observable  mineAll = [];
  @observable  mine = {};
  @observable currentMine = '';
  @observable attac = 0;
  @observable health = 0;

  @computed get mineIsClose() {
    return this.mineClose.indexOf(this.currentMine) !== -1
  }

  @computed get mineIsAlly() {
    try {
      return this.mine.clan.id === this.heroes.clan.id
    } catch (e) {
      return false;
    }
  }

  @observable  heroes = {};
  @observable  clans = {};
  @observable  heroesAll = [];
  @observable  position;
  @observable  unitsAll = [];

  currentHeroes = Boolean(Math.round(Math.random())) ? '4719e99b-3185-4eb7-9db4-83494c1445a3' : "1fa66419-0706-4da2-9016-ab5d20049dbd";

  constructor(mines = null) {

    autorun(() => {
      if (this.currentMine) {
        this.fetchMine()
      }
    })
  }

  openMine(mine) {
    debugger;
  }

  init() {
    this.fetchMineAll();
    this.fetchHeroes();
    this.fetchClans();
    this.fetchUnitsAll();
    setInterval(() => {
      this.fetchMine();
    }, 10000)
  }

  fetchMineAll = async () => {
    try {
      const { data } = await Axios.get(`${API_BASE}mines`);
      this.mineAll = data;
    } catch (e) {
      console.error(e.message);
    }
  }
  fetchMine = async () => {
    try {
      const { data } = await Axios.get(`${API_BASE}mines/${this.currentMine}`);
      this.mine = data;
    } catch (e) {
      console.error(e.message);
    }
  }
  fetchAtack = async () => {
    try {
      const { data } = await Axios.post(`${API_BASE}mines/attack`, {
        heroId: this.currentHeroes,
        mineId: this.currentMine
      });
    } catch (e) {
      console.error(e.message);
    }
  }
  fetchColect = async () => {
    try {
      await Axios.post(`${API_BASE}mines/collect`, {
        heroId: this.heroes.id,
        mineId: this.mine.id
      });
      await this.fetchHeroes();
      await this.fetchMine();
    } catch (e) {
      console.error(e.message);
    }
  }
  fetchHeroes = async () => {
    try {
      const { data } = await Axios.get(`${API_BASE}heroes/${this.currentHeroes}`);
      this.heroes = data;
      this.attac = 0;
      this.health = 0;

      if (data.army && data.army.length) {
        data.army.forEach(item => {
          this.attac = this.attac + Number(item.unit.attack) * item.qty;
          this.health = this.health + Number(item.unit.health) * item.qty;
        })
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  fetchHeroesAll = async () => {
    try {
      const { data } = await Axios.get(`${API_BASE}heroes`);
      this.heroesAll = data;

    } catch (e) {
      console.error(e.message);
    }
  }
  fetchUnitsAll = async () => {
    try {
      const { data } = await Axios.get(`${API_BASE}units`);
      this.unitsAll = data;
    } catch (e) {
      console.error(e.message);
    }
  }

  fetchClans = async () => {
    try {
      const { data } = await Axios.get(`${API_BASE}clans`);
      this.clans = data;
    } catch (e) {
      console.error(e.message);
    }
  }


  fetchAddInToMien = async (reqest) => {
    if (!this.currentMine) {
      console.error('currentMine not have');
      return
    }
    try {
      await Axios.put(`${API_BASE}mines/${this.currentMine}`, { army: reqest });
      await this.fetchHeroes();
      await this.fetchMine();
      window.history.back()
    } catch (e) {
      console.error(e.message);
    }
  }
  fetchAddInToHeroes = async (reqest) => {
    try {
      const { data } = await Axios.put(`${API_BASE}heroes/${this.currentHeroes}`, { army: [reqest] });

      await this.fetchHeroes();
    } catch (e) {
      console.error(e.message);
    }
  }

}
