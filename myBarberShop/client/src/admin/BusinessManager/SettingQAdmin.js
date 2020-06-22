import React, { Component } from 'react';
import axios from 'axios';


class SettingQAdmin extends Component {

    state = {
        flag: false,
        added: false,
        dateValue: '',
        selectValue: '',
        selectStyle: '',
        userName: '',
        allQueues: [],
        filterQueues: [],
        alertError: false,
        alertSuccesss: false,
        dateChoosen: false,
        styleChoosen: false,
        timeChoosen: false,
        times: [
            { time: '11:00' },
            { time: '11:20' },
            { time: '11:40' },
            { time: '12:00' },
            { time: '12:20' },
            { time: '12:40' },
            { time: '13:00' },
            { time: '13:20' },
            { time: '13:40' },
            { time: '14:00' },
            { time: '14:20' },
            { time: '14:40' },
            { time: '15:00' },
            { time: '15:20' },
            { time: '15:40' },
            { time: '16:00' },
            { time: '16:20' },
            { time: '16:40' },
            { time: '17:00' },
            { time: '17:20' },
            { time: '17:40' },
            { time: '18:00' },
            { time: '18:20' },
            { time: '18:40' },
            { time: '19:00' },
            { time: '19:20' },
            { time: '19:40' },
            { time: '20:00' },
            { time: '20:20' },
            { time: '20:40' },
            { time: '21:00' }],
        timesList: [],
        barberChoosen: false
    }

    id = '';
    dateValue = ''
    selectValue = ''
    selectStyle = ''
    dateVal = ''
    user = ''
    chooseBarber = ''



    scheduledCustomerQueues = () => {

        this.setState({
            dateValue: this.dateValue,
            selectValue: this.selectValue,
            selectStyle: this.selectStyle,
            userName: this.user
        })

        console.log(this.user);
        const data = {
            time: this.dateValue,
            date: this.selectValue,
            style: this.selectStyle,
            userName: this.user,
            barber: this.chooseBarber
        }
        console.log(data);


        axios.post('/queues/scheduledCustomerQueues', data)

            .then(res => {
                if (res.status === 201) {
                    console.log(res.data, 'hdwbrfkvjwnlgvbakgblrgnrwlgkrwnglr!!!!!!!!!!');
                    console.log(res.data._id, 'jdjdksjkjksdrgdf');
                    this.id = res.data._id;
                    let tmp = [...this.state.allQueues]
                    tmp.push(res.data)
                    this.setState({ allQueues: tmp })
                    this.setState({ alertSuccess: true })
                }
                else {
                    console.log(`error code ${res.status}`)
                }

            }).catch(err => {

                this.setState({ alertError: true })
                console.log(err)

            })
    }

    componentDidMount() {
        this.filt();
    }

    getQueues = () => {
        axios.get('/queues/scheduledCustomerQueues')
            .then((res) => {
                // handle success
                console.log(res);
                this.setState({ allQueues: res.data })

                for (let i = 0; i < this.state.allQueues.length; i++) {
                    const element = this.state.allQueues[i];
                    console.log(element.time);
                    console.log(element.date);
                    let temp = [...this.state.timesList]
                    temp.push({ date: element.date, time: element.time, barber: element.barber })
                    this.setState({ timesList: temp })
                    console.log(this.state.timesList);

                }

            })
            .catch((err) => {
                // handle error
                console.log(err);
            })
    }



    render() {
        return (
            <div>

                {this.state.alertError ? <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>התור קיים!</strong>  אנא בחר תור חדש.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() =>
                        this.setState({ alertError: !this.state.alertError })}>
                        <span id='exit' aria-hidden="true">&times;</span>
                    </button>
                </div> : null}

                {this.state.alertSuccess ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>התור נקבע בהצלחה!</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() =>
                        this.setState({ alertSuccess: !this.state.alertSuccess })}>
                        <span id='exit' aria-hidden="true">&times;</span>
                    </button>
                </div> : null}


                <div className='settingQ'>

                    <div>
                        <input type="text" name="" placeholder='שם לקוח'
                            onChange={(e) => { this.user = e.target.value }} />

                        <select onChange={(e) => { this.chooseBarber = e.target.value; this.setState({ barberChoosen: true }) }}>
                            <option > בחר ספר</option>
                            <option >worker</option>
                            <option >admin</option>
                        </select>
                        {this.state.barberChoosen ?
                            <input type="date" name="date" onChange={(e) => {
                                this.selectValue = e.target.value;
                                this.setState({ dateChoosen: true })
                                this.filtTimes();
                            }} /> : ''}




                        {this.state.dateChoosen ?
                            <select onChange={(e) => {

                                this.dateValue = e.target.value; this.setState({ timeChoosen: true })

                            }}>

                                {this.state.times.map((time, i) =>

                                    <option key={i} > {time.time} </option>

                                )}
                            </select>
                            : ""}

                        {this.state.timeChoosen ?
                            <select onChange={(e) => { this.selectStyle = e.target.value; this.setState({ styleChoosen: true }) }}>
                                <option ></option>
                                <option>תספורת רגילה</option>
                                <option>תספורת+צבע</option>
                                <option>תספורת+החלקה+צבע</option>
                                <option>תספורת+החלקה</option>
                                <option>תספורת+ציורים</option>


                            </select>
                            : ""}
                    </div>

                    <div>
                        <button type='button' onClick={
                            this.scheduledCustomerQueues}>קבע תור</button>

                    </div>
                </div>


            </div>
        )
    }
    filt = () => {
        this.getQueues();
        if (this.dateValue === '') {
            this.setState({ filterQueues: this.state.allQueues })
        } else {
            const filtered = this.state.allQueues.filter((q, i) => q.date === this.dateValue);

            this.setState({ filterQueues: filtered })
        }


    }

    filtTimes = () => {
        console.log(this.state.timesList);

        for (let i = 0; i < this.state.times.length; i++) {
            const clientTime = this.state.times[i].time;
            for (let j = 0; j < this.state.timesList.length; j++) {
                const dbTime = this.state.timesList[j].time;
                console.log(clientTime, dbTime);

                if (clientTime === dbTime && this.state.timesList[j].date === this.selectValue && this.state.timesList[j].barber === this.chooseBarber) {
                    console.log(this.state.times.splice(i, 0));
                    return this.state.times.splice(i, 1)

                } else {
                    console.log('eroor splice');
                }
            }
        }
    }


}




export default SettingQAdmin;