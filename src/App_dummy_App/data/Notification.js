const Images = [
    {image: require('../dummy_images/cancel.png')},
    {image: require('../dummy_images/new.png')},
    {image: require('../dummy_images/payment.png')},
    {image: require('../dummy_images/schedule.png')},
  ];
  
  export const notification_data = [
    {
      id: '1',
      notification_image: Images[0].image,
      notification_name: 'Order canceled',
      notification_time:'03:00 pm',
      notification_detail:'Lorem ipsum dolor sit amet,'+ 
      'consetetur sadipscing elitr, sed diam nonumy eirmod'+ 
      'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
      notification_type:'cancel'
    },
    {
      id: '2',
      notification_image: Images[0].image,
      notification_name: 'New Appointment',
      notification_time:'03:00 pm',
      notification_detail:'Lorem ipsum dolor sit amet,'+ 
      'consetetur sadipscing elitr, sed diam nonumy eirmod'+ 
      'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
      notification_type:'new'
    },
    {
        id: '3',
        notification_image: Images[0].image,
        notification_name: 'Payment received successfully',
        notification_time:'03:00 pm',
        notification_detail:'Lorem ipsum dolor sit amet,'+ 
        'consetetur sadipscing elitr, sed diam nonumy eirmod'+ 
        'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
        notification_type:'payment'
      },
      {
        id: '4',
        notification_image: Images[0].image,
        notification_name: 'Appointment Scheduled',
        notification_time:'03:00 pm',
        notification_detail:'Lorem ipsum dolor sit amet,'+ 
        'consetetur sadipscing elitr, sed diam nonumy eirmod'+ 
        'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
        notification_type:'schedule'
      },
    {
      id: '5',
      notification_image: Images[0].image,
      notification_name: 'One hour left in appointment',
      notification_time:'03:00 pm',
      notification_detail:'Lorem ipsum dolor sit amet,'+ 
      'consetetur sadipscing elitr, sed diam nonumy eirmod'+ 
      'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
      notification_type:'loading'
    },
  
    {
        id: '6',
        notification_image: Images[0].image,
        notification_name: 'Olivia complained about you',
        notification_time:'03:00 pm',
        notification_detail:'Lorem ipsum dolor sit amet,'+ 
        'consetetur sadipscing elitr, sed diam nonumy eirmod'+ 
        'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
        notification_type:'complained'
      },
   
  ];
  