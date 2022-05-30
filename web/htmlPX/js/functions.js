// Function intended to update values in textfields when any slider is changed
function updateValue(sender){
    // Obtaining values from sliders
    var waistVal = document.getElementById('waistRange').value;
    var shoulderVal = document.getElementById('shoulderRange').value;
    var elbowVal = document.getElementById('elbowRange').value;
    var wristVal = document.getElementById('wristRange').value;
    var handVal = document.getElementById('handRange').value;

    var valueDeg = sender.value;
    var name = sender.id;
    var id = 0;
    switch(name){
        case 'waistRange':
            id = 1;
            break;
        case 'shoulderRange':
            id = 2;
            break;
        case 'elbowRange':
            id = 3;
            break;
        case 'wristRange':
            id = 4;
            break;
        case 'handRange':
            id = 5;
            break;
        default:
            break;
    }

    // Assigning values
    // Waist
    waistInput = document.getElementById('waistInput');
    waistInput.value = waistVal;

    // Shoulder
    shoulderInput = document.getElementById('shoulderInput');
    shoulderInput.value = shoulderVal;

    // Waist
    elbowInput = document.getElementById('elbowInput');
    elbowInput.value = elbowVal;

    // Wrist
    wristInput = document.getElementById('wristInput');
    wristInput.value = wristVal;

    // Hand
    handInput = document.getElementById('handInput');
    handInput.value = handVal;

    callSrvPX(id,valueDeg);    
}

function callSrvPX(id,valueDeg){
    var commandClient = new ROSLIB.Service({
        ros: ros,
        name: '/dynamixel_workbench/dynamixel_command',
        serviceType: 'dynamixel_workbench_msgs/DynamixelCommand'
    });

    var value = (parseFloat(valueDeg)+180)*2048/180;
    value = parseInt(value);
    //console.log(value)

    var request = new ROSLIB.ServiceRequest({
        command: '',
        id: parseFloat(id),
        addr_name: 'Goal_Position',
        value: parseInt(value)
    });

    console.log(request);

    commandClient.callService(request,function(result){
        console.log('Done');
    });

}

function readJointStates(){
    var listener = new ROSLIB.Topic({
        ros: ros,
        name: '/dynamixel_workbench/joint_states',
        messageType: 'sensor_msgs/JointState'
    });

    listener.subscribe(function(message){
        // Extracting position values
        var position = message.position;

        // Assigning values to sliders
        console.log(position[0]*180/3.1415);
        console.log(position[0]);
        document.getElementById('waistRange').value = position[0]*180/3.1415;
        document.getElementById('shoulderRange').value = position[1]*180/3.1415;
        document.getElementById('elbowRange').value = position[2]*180/3.1415;
        document.getElementById('wristRange').value = position[3]*180/3.1415;
        document.getElementById('handRange').value = position[4]*180/3.1415;

        // Assigning values to textfields
        document.getElementById('waistInput').value = position[0]*180/3.14115;
        document.getElementById('shoulderInput').value = position[1]*180/3.14115;
        document.getElementById('elbowInput').value = position[2]*180/3.14115;
        document.getElementById('wristInput').value = position[3]*180/3.14115;
        document.getElementById('handInput').value = position[4]*180/3.14115;

        listener.unsubscribe();
    })
}

// Connection with ROS
var ros = new ROSLIB.Ros({
    //url: 'ws://localhost:9090'
    //url: 'ws://192.168.1.70:9090'
    url: 'ws://181.61.68.202:9090'
});

ros.on('connection', function(){
    console.log('Connected to websocket server.');
});

ros.on('error', function(error){
    console.log(`Error: ${error}`);
});

ros.on('close', function(){
    console.log('Connection terminated.');
});

//readJointStates()


