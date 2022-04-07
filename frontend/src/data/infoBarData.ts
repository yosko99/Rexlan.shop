import { faTruck, IconDefinition, faCircleDollarToSlot, faClock, faLock	 } from '@fortawesome/free-solid-svg-icons';

export interface TextAreaData {
	icon: IconDefinition;
	firstText: string;
	secondText: string;
}

export const textAreas: TextAreaData[] = [
  {
    icon: faTruck,
    firstText: 'Free shipping & return',
    secondText: 'Free shipping on all orders over 99$'
  },
  {
    icon: faCircleDollarToSlot,
    firstText: 'Money back guarantee',
    secondText: '100% money back guarantee'
  },
  {
    icon: faClock,
    firstText: 'Online support 24/7',
    secondText: 'Lorem ipsum lorem lorem'
  },
  {
    icon: faLock,
    firstText: 'Secure payment',
    secondText: 'Lorem ipsum lorem lorem'
  }
];
