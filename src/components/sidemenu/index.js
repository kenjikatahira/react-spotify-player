import React from 'react';

const SideMenu = ({playlists}) => {
    const getPlaylists = () => {
        // aqui request para varios tipos de listas
    }
    const renderList = ({name,public : _public,tracks,images,owner,href,id,collaborative}) => {
        return (
            <li key={id}>{name}</li>
        )
    }
    if((playlists || {}).items) {
        return (
            <>
                <div className="sidemenu">
                    {playlists.items.map(renderList)}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="sidemenu">
                    loading
                </div>
            </>
        )
    }
}

export default SideMenu;
