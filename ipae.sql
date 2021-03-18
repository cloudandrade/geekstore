SELECT DISTINCT 
    Q1.SIMU_SQ_SIMULADO simu_sq_simulado,
       	Q1.SIMU_NM_SIMULADO simu_nm_simulado,
       	FASE_SIMULADO,	
       	TO_CHAR(TO_DATE(DATA_PREVISTA,'dd/mm/YYYY')) DATA_PREVISTA, 
       	TIPO_SIMULADO,	
       	AREA_NEGOCIO,	
       	UNIDADE_RESPONSAVEL,	
       	NIVEL_RESPOSTA,	
       	OBJETIVO_SIMULADO,	
       	TO_CHAR(TO_DATE(DATA_INICIO,'dd/mm/YYYY')) DATA_INICIO,	
       	TO_CHAR(TO_DATE(DATA_FIM,'dd/mm/YYYY')) DATA_FIM,	
       	LOCALIZACAO_SIMULADO,	
       	NVL(RESUMO_SIMULADO,'') RESUMO_SIMULADO ,	
       	DECODE (SIMULADO_COM_VITIMA,'S','Sim','N','Não','' ) SIMULADO_COM_VITIMA,	
       	CENARIO,	
       	ACOES_DE_PLANEJAMENTO,	
       	PARTICIPANTES,	
       	SIMULADO_RECURSO,	
       	AVALIADOR_QUESITO,	
       	AVALIADOR_QUESITO_NOTA	
       	FROM 	
       	(select DISTINCT S.SIMU_SQ_SIMULADO, 	
       	s.SIMU_NM_SIMULADO , DECODE (S.SIMU_IN_FASE, 'PL', 'Planejamento', 
       	                             'PR', 'Programação', 	
       	                             'AV', 'Avaliação', 	
       	                             'AC', 'Ações Corretivas',	
       	                             'PL', 'PLANEJAMENTO',	
       	                                ' ') FASE_SIMULADO,	
       	TO_CHAR(TO_DATE(S.SIMU_DT_PREVISTA,'dd/mm/YYYY')) DATA_PREVISTA , 
       	(SELECT LISTAGG(ts.TISI_IN_TIPO_SIMULADO, ', ') WITHIN GROUP (ORDER BY TISI_IN_TIPO_SIMULADO) 
                        FROM tipo_simulado ts where ts.simu_sq_simulado = s.simu_sq_simulado) TIPO_SIMULADO,	
       	a.AREA_NM_AREA AREA_NEGOCIO,	
       	un.UNAD_NM_UNIDADE_ADMINISTRATIVA UNIDADE_RESPONSAVEL,	
       	DECODE (S.SIMU_IN_NIVEL_RESPOSTA, 'L', 'Local', 	
       	                             'R', 'Regional', 	
       	                             'N', 'Nacional', 	
       	                             'I', 'Internacional',	
       	                                ' ') NIVEL_RESPOSTA,	
       	S.SIMU_TX_OBJETIVO OBJETIVO_SIMULADO,	
       	TO_CHAR(TO_DATE(S.SIMU_DT_INICIO,'dd/mm/YYYY')) DATA_INICIO,	
       	TO_CHAR(TO_DATE(S.SIMU_DT_FIM,'dd/mm/YYYY')) DATA_FIM,	
       	S.SIMU_DS_LOCALIZACAO  LOCALIZACAO_SIMULADO,	
       	S.SIMU_TX_RESUMO RESUMO_SIMULADO,	
       	DECODE (S.SIMU_IN_POSSUI_VITIMAS, 'S', 'Sim', 	
       	                             'N', 'Não',	
       	                                ' ') SIMULADO_COM_VITIMA 
       	from 
       	simulado s 
       	left join simulado_quesito sq on (s.simu_sq_simulado = sq.simu_sq_simulado) 
       	left join simulado_avaliacao sa on (sq.SIQU_SQ_SIMULADO_QUESITO = sa.SIQU_SQ_SIMULADO_QUESITO) 
       	left join participante p on (p.PART_SQ_PARTICIPANTE = sa.SAVP_SQ_PARTICIPANTE) 
       	left join unidade_administrativa un on (un.UNAD_SQ_UNIDADE_ADMINISTRATIVA = s.UNAD_SQ_UNIDADE_ADMINISTRATIVA) 
       	left join area a on (a.area_sq_area = un.area_sq_area)	
       	left join SIMULADO_ACAO sc on (sc.simu_sq_simulado = s.simu_sq_simulado)) Q1 
       	left join 
       	(SELECT SIMU_SQ_SIMULADO, LISTAGG(SIAC_DS_ACAO || ' ; ',CHR(13)) 
       	  WITHIN GROUP (ORDER BY SIAC_DS_ACAO) ACOES_DE_PLANEJAMENTO 
       	  FROM SIMULADO_ACAO 
       	  WHERE SIAC_IN_FASE = 'P' 
       	  GROUP BY SIMU_SQ_SIMULADO) Q2 on (Q1.SIMU_SQ_SIMULADO = Q2.SIMU_SQ_SIMULADO) 
       	LEFT JOIN 
       	(  SELECT SIMU_SQ_SIMULADO,LISTAGG( 
       	  P.PART_CD_CHAVE_PART_INTERNO ||' '|| 
       	  PART_NM_PART_EXTERNO ||' '||  
       	  PART_NR_TELEF_PART_EXTERNO ||' '|| 
       	  PART_TX_EMAIL_PART_EXTERNO || CHR(13))  WITHIN GROUP (ORDER BY SIMU_SQ_SIMULADO) PARTICIPANTES 
       	  FROM 	
       	  PARTICIPANTE  P,  SIMULADO_PARTICIPANTE_PLANEJAM pp where p.part_sq_participante = pp.part_sq_participante 
       	  GROUP BY SIMU_SQ_SIMULADO) Q3 ON Q3.SIMU_SQ_SIMULADO = Q1.SIMU_SQ_SIMULADO 
       	LEFT JOIN (  SELECT S.SIMU_SQ_SIMULADO, LISTAGG(RS.RESI_NM_RECURSO || ' ; ',CHR(13)) 
       	  WITHIN GROUP (ORDER BY S.SIMU_SQ_SIMULADO) SIMULADO_RECURSO 
       	  FROM 	
       	  RECURSO_SIMULADO RS 
       	  JOIN SIMULADO S ON (S.SIMU_SQ_SIMULADO = RS.SIMU_SQ_SIMULADO)	
       	  GROUP BY S.SIMU_SQ_SIMULADO) Q4 ON Q4.SIMU_SQ_SIMULADO = Q1.SIMU_SQ_SIMULADO 	
       	LEFT JOIN (select s.SIMU_SQ_SIMULADO,LISTAGG(p.PART_CD_CHAVE_PART_INTERNO ||  p.PART_NM_PART_EXTERNO||' - '|| q.QUAV_DS_QUESITO|| ' ; ',CHR(13)) 
       	  WITHIN GROUP (ORDER BY S.SIMU_SQ_SIMULADO) AVALIADOR_QUESITO 
       	from simulado s	
       	join simulado_quesito sq on (sq.SIMU_SQ_SIMULADO = s.SIMU_SQ_SIMULADO)
       	join quesito_avaliacao q on (q.QUAV_SQ_QUESITO = sq.QUAV_SQ_QUESITO) 
       	join simulado_avaliacao sa on (sa.SIQU_SQ_SIMULADO_QUESITO = sq.SIQU_SQ_SIMULADO_QUESITO) 
       	join participante p on (sa.savp_sq_participante = p.part_sq_participante) 
       	where sq.SIQU_IN_FASE = 'AV'	
       	GROUP BY s.SIMU_SQ_SIMULADO) Q5 ON Q5.SIMU_SQ_SIMULADO = Q1.SIMU_SQ_SIMULADO	
       	LEFT JOIN (select s.SIMU_SQ_SIMULADO,LISTAGG(p.PART_CD_CHAVE_PART_INTERNO ||  p.PART_NM_PART_EXTERNO||' - '|| q.QUAV_DS_QUESITO|| ' NOTA: ' || SA.SIAV_TX_NOTA || ' ; ',CHR(13)) 
       	  WITHIN GROUP (ORDER BY S.SIMU_SQ_SIMULADO) AVALIADOR_QUESITO_NOTA  	
       	from simulado s	
       	join simulado_quesito sq on (sq.SIMU_SQ_SIMULADO = s.SIMU_SQ_SIMULADO)	
       	join quesito_avaliacao q on (q.QUAV_SQ_QUESITO = sq.QUAV_SQ_QUESITO)	
       	join simulado_avaliacao sa on (sa.SIQU_SQ_SIMULADO_QUESITO = sq.SIQU_SQ_SIMULADO_QUESITO)	
       	join participante p on (sa.savp_sq_participante = p.part_sq_participante)	
       	where sq.SIQU_IN_FASE = 'AV'	
       	GROUP BY s.SIMU_SQ_SIMULADO)Q6 ON ( Q6.SIMU_SQ_SIMULADO = Q1.SIMU_SQ_SIMULADO ) 	
       	LEFT JOIN ( 
       	SELECT 
       	    cs.simu_sq_simulado, 
       	    LISTAGG(cs.cesi_ds_cenario || ' ; ', 
       	    CHR(13) ) WITHIN GROUP( 
       	    ORDER BY 
       	        cs.cesi_ds_cenario 
       	    ) cenario 
       	FROM 
       	    CENARIO_SIMULADO cs 
       	GROUP BY 
       	    cs.simu_sq_simulado 
       	) q7 ON ( q1.simu_sq_simulado = q7.simu_sq_simulado ) 
       	where Q1.SIMU_SQ_SIMULADO IN (:listaSimulado);