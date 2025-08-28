
import React, { useEffect, useState, useRef } from 'react';
import { get_devices } from './../api/spotify';
import { get_device_id } from './../utils';

const DevicesBar = ({ onChangeDevice, currentDeviceId }) => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Atualiza dispositivos a cada 2s
    const intervalRef = useRef();
    useEffect(() => {
        const fetchDevices = () => {
            get_devices().then((response) => {
                let devs = response.data.devices || [];
                const localId = get_device_id();
                // Se o próprio player não está na lista, adiciona
                if (localId && !devs.some(d => d.id === localId)) {
                    devs = [
                        ...devs,
                        {
                            id: localId,
                            name: 'Este navegador',
                            is_active: devs.some(d => d.is_active) ? false : (currentDeviceId === localId)
                        }
                    ];
                } else if (localId) {
                    // Garante que o status is_active do local está correto
                    devs = devs.map(d => d.id === localId ? { ...d, is_active: currentDeviceId === localId } : d);
                }
                setDevices(devs);
                setLoading(false);
            });
        };
        fetchDevices();
        intervalRef.current = setInterval(fetchDevices, 2000);
        return () => clearInterval(intervalRef.current);
    }, [currentDeviceId]);

    if (loading) return <div className="devices-bar-wrapper">Carregando dispositivos...</div>;
    if (!devices.length) return <div className="devices-bar-wrapper">Nenhum dispositivo online</div>;

    // Garante que o valor do select sempre reflete o dispositivo ativo
    const activeDeviceId = devices.find(d => d.is_active)?.id || currentDeviceId || '';
    return (
        <div className="devices-bar-wrapper">
            <span>Dispositivos online:&nbsp;</span>
            <select
                value={activeDeviceId}
                onChange={e => onChangeDevice(e.target.value)}
            >
                {devices.map(device => (
                    <option key={device.id} value={device.id}>
                        {device.name} {device.is_active ? '(Ativo)' : ''}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DevicesBar;
