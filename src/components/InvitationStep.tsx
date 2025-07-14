import { Users, Home, UserCheck, UserX } from 'lucide-react';
import { Invitation, AccommodationOption } from '../types';

interface InvitationStepProps {
    invitation: Invitation;
    accommodationOption: AccommodationOption;
    onAccept: () => void;
    onReject: () => void;
}

export const InvitationStep = ({
    invitation,
    accommodationOption,
    onAccept,
    onReject
}: InvitationStepProps) => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">У вас есть приглашение!</h2>
                <p className="text-gray-600">Коллега приглашает вас разместиться вместе</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">
                            {invitation.fromUser.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {invitation.fromUser.name}
                    </h3>
                    <p className="text-gray-600">
                        {invitation.fromUser.department} • {invitation.fromUser.position}
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                    <div className="flex items-center mb-3">
                        <Home className="w-6 h-6 text-blue-500 mr-2" />
                        <h4 className="font-semibold text-gray-800">Детали размещения</h4>
                    </div>
                    <div className="space-y-2">
                        <p><span className="font-medium">Тип номера:</span> {accommodationOption.name}</p>
                        <p><span className="font-medium">Описание:</span> {accommodationOption.description}</p>
                        <p><span className="font-medium">Вместимость:</span> до {accommodationOption.maxGuests} человек</p>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-blue-800 text-center">
                        <strong>{invitation.fromUser.name}</strong> приглашает вас разместиться в {accommodationOption.name.toLowerCase()}е
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={onReject}
                        className="flex items-center justify-center px-6 py-3 border-2 border-red-300 text-red-700 rounded-xl font-semibold hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                    >
                        <UserX className="w-5 h-5 mr-2" />
                        Отказаться
                    </button>
                    <button
                        onClick={onAccept}
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                    >
                        <UserCheck className="w-5 h-5 mr-2" />
                        Принять
                    </button>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500">
                <p>После принятия приглашения вы сможете выбрать трансфер и активности</p>
                <p>При отказе вам будет предложено выбрать размещение самостоятельно</p>
            </div>
        </div>
    );
};