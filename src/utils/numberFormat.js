function numberFormat(sonlar) {
    const sonlarStr = sonlar.toString();
    
    if (sonlarStr.length <= 3) {
        return sonlarStr;
    } else {
        const qolganQism = sonlarStr.length % 3 || 3;
        let ajratilganSonlar = sonlarStr.slice(0, qolganQism);
        
        for (let i = qolganQism; i < sonlarStr.length; i += 3) {
            ajratilganSonlar += ' ' + sonlarStr.slice(i, i + 3);
        }
        
        return ajratilganSonlar;
    }
}