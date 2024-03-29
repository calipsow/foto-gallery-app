import { Bar } from "react-chartjs-2";
import React from "react"
import Loader from "../loader/Loader";
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend, BarElement

} from 'chart.js'


export default class Statistics extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true, chartData: null
        }
        this.data = []; this.elements = []
        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Legend, BarElement
        )
    }

    async componentDidMount(){
        if(this.data.length !== 0 || !this.state.loading ) return;
        let dataset = null
        
        if( !this.props.dataSet ){
            dataset = await this.fetchData();
        
        } else dataset = this.props.dataSet
        
        const keys = Object.keys(dataset);

        let dataObj = {}

        keys.forEach(key => {
        
            if(typeof dataset[key] === 'string' ) return
        
            dataObj[key] = {}
            dataObj[key].labels = []
            dataObj[key].data = []
            
            let values = dataset[key].historical.values

            values.forEach( value => {
                
                dataObj[key].labels.push(
                    value.date
                )
                dataObj[key].data.push(
                    value.value
                )

            })
        })
        
        let oKeys = Object.keys(dataObj)

        oKeys.forEach( key => {

            this.data.push(
                {
                    labels: dataObj[key].labels.map( label => { let ar = label.split('-'); return ar[2]+'.'+ar[1]} ),
                    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
                    datasets: [
                        {
                          labels: key,
                          data: dataObj[key].data,
                          // you can set indiviual colors for each bar
                          backgroundColor: [
                            'rgba(255, 255, 255, 0.6)',
                            'rgba(255, 255, 255, 0.6)',
                            'rgba(255, 255, 255, 0.6)'
                          ],
                          borderWidth: 1,
                        }
                    ]
            }
            )
        })

        
        

        
        let check = {}

        oKeys.forEach(key => {
            check[key] = true
        })
        this.arr = []
        this.elements = []
        this.data.forEach( chartData => {
            if( !check[chartData.datasets[0].labels] ){ return };            


            if( check[chartData.datasets[0].labels] ){
                check[chartData.datasets[0].labels] = false
  
                    
                    this.elements.push(
                        this.BarChart({chartData})
                    )
                    return
               

            }
            return
        })

        this.setState({loading: false})
    }
    BarChart = ({ chartData }) => {
        
        return (

        <div className="card w-100 text-white bg-dark" style={{marginTop: '50px'}} key={this.generateKey()}>
            <div className="card-body">
            <p className="text-sm-left" style={{marginLeft: '50px'}}>{chartData.datasets[0].labels.toUpperCase()+ ' Trend last 30 days'}</p>
            <Bar
                data={chartData}
                options={{
                plugins: {
                    title: {
                    display: true,
                    text: chartData.datasets[0].labels.toUpperCase() || 'Chart'
                    },
                    legend: {
                    display: true,
                    position: "bottom"
                }
                }
                }}
            />
            </div>
        </div>
        );
    };
    generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }
      

    fetchData = async () => {
        return await fetch(this.props.url)
        .then(data => data.json())
        .then(data => data.response)
        .catch(err => console.error(err) )
    }

    render(){
        return (
            <div>
                { !this.state.loading ? this.elements : <Loader></Loader>}
            </div>
        )
    }
}